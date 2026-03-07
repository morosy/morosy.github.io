(function() {
    var SCHEMA_VERSION = 1;
    var FORMAT = 'stockmanager-board-template';

    var boardNameInput = document.getElementById('board-name');
    var boardItemsInput = document.getElementById('board-items');
    var boardNameError = document.getElementById('board-name-error');
    var boardItemsError = document.getElementById('board-items-error');
    var globalError = document.getElementById('global-error');

    var usageButton = document.getElementById('usage-button');
    var resetButton = document.getElementById('reset-button');
    var exportButton = document.getElementById('export-button');
    var homeButton = document.getElementById('home-button');
    var backButton = document.getElementById('back-button');

    var usageOverlay = document.getElementById('usage-overlay');
    var closeOverlayButton = document.getElementById('close-overlay-button');

    function charCount(value) {
        return Array.from(value).length;
    }

    function hasUnsavedInput() {
        return boardNameInput.value.trim() !== '' || boardItemsInput.value.trim() !== '';
    }

    function setFieldState(input, errorElement, message) {
        errorElement.textContent = message || '';
        if (message) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    }

    function validateBoardName() {
        var value = boardNameInput.value;
        var trimmed = value.trim();

        if (trimmed === '') {
            setFieldState(boardNameInput, boardNameError, 'ボード名を入力してください。');
            return { ok: false };
        }

        if (value.indexOf('\n') >= 0 || value.indexOf('\r') >= 0) {
            setFieldState(boardNameInput, boardNameError, 'ボード名に改行は使えません。');
            return { ok: false };
        }

        if (charCount(trimmed) > 10) {
            setFieldState(boardNameInput, boardNameError, 'ボード名は10文字以内で入力してください。');
            return { ok: false };
        }

        setFieldState(boardNameInput, boardNameError, '');
        return { ok: true, value: trimmed };
    }

    function validateItems() {
        var text = boardItemsInput.value.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        var items = [];

        if (lines.length > 500) {
            setFieldState(boardItemsInput, boardItemsError, '要素は500行以内で入力してください。');
            return { ok: false };
        }

        for (var i = 0; i < lines.length; i += 1) {
            var line = lines[i].trim();
            if (line === '') {
                continue;
            }

            if (charCount(line) > 24) {
                setFieldState(boardItemsInput, boardItemsError, (i + 1) + '行目は24文字以内で入力してください。');
                return { ok: false };
            }

            items.push(line);
        }

        if (items.length === 0) {
            setFieldState(boardItemsInput, boardItemsError, '要素を1つ以上入力してください。');
            return { ok: false };
        }

        setFieldState(boardItemsInput, boardItemsError, '');
        return { ok: true, values: items };
    }

    function validateAll() {
        globalError.textContent = '';
        var nameResult = validateBoardName();
        var itemsResult = validateItems();

        if (!nameResult.ok || !itemsResult.ok) {
            globalError.textContent = '入力内容を確認してください。';
            return { ok: false };
        }

        return {
            ok: true,
            boardName: nameResult.value,
            items: itemsResult.values
        };
    }

    function buildTemplate(boardName, items) {
        return {
            schemaVersion: SCHEMA_VERSION,
            format: FORMAT,
            board: {
                name: boardName,
                items: items.map(function(itemName) {
                    return { name: itemName };
                })
            }
        };
    }

    function safeFileName(name) {
        var normalized = name.replace(/[\\/:*?"<>|]/g, '_').trim();
        return normalized === '' ? 'stockmanager_board' : normalized;
    }

    function downloadJson(data, fileName) {
        var jsonText = JSON.stringify(data, null, 2);
        var blob = new Blob([jsonText], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function closeOverlay() {
        usageOverlay.classList.add('hidden');
    }

    function openOverlay() {
        usageOverlay.classList.remove('hidden');
    }

    function navigateWithGuard(url) {
        if (hasUnsavedInput()) {
            var proceed = window.confirm('入力内容が破棄されます。移動しますか？');
            if (!proceed) {
                return;
            }
        }
        window.location.href = url;
    }

    boardNameInput.addEventListener('input', validateBoardName);
    boardItemsInput.addEventListener('input', validateItems);

    usageButton.addEventListener('click', openOverlay);
    closeOverlayButton.addEventListener('click', closeOverlay);
    usageOverlay.addEventListener('click', function(event) {
        if (event.target === usageOverlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !usageOverlay.classList.contains('hidden')) {
            closeOverlay();
        }
    });

    resetButton.addEventListener('click', function() {
        if (hasUnsavedInput()) {
            var proceed = window.confirm('入力内容をリセットします。よろしいですか？');
            if (!proceed) {
                return;
            }
        }

        boardNameInput.value = '';
        boardItemsInput.value = '';
        boardNameInput.classList.remove('invalid');
        boardItemsInput.classList.remove('invalid');
        boardNameError.textContent = '';
        boardItemsError.textContent = '';
        globalError.textContent = '';
    });

    exportButton.addEventListener('click', function() {
        var result = validateAll();
        if (!result.ok) {
            return;
        }

        var jsonData = buildTemplate(result.boardName, result.items);
        var outputFileName = safeFileName(result.boardName) + '_template.json';
        downloadJson(jsonData, outputFileName);
    });

    homeButton.addEventListener('click', function() {
        navigateWithGuard('index.html');
    });

    backButton.addEventListener('click', function() {
        navigateWithGuard('stockmanager.html');
    });

    window.addEventListener('beforeunload', function(event) {
        if (!hasUnsavedInput()) {
            return;
        }

        event.preventDefault();
        event.returnValue = '';
    });
})();
