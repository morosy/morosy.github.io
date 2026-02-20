document.addEventListener('DOMContentLoaded', function() {
    const worksContainer = document.getElementById('works-container');
    const worksGrid = worksContainer.querySelector('.works-grid');
    const moreBtn = document.getElementById('more-btn');

    // タイル数を計算
    const tiles = worksGrid.querySelectorAll('.work-tile');
    const tileCount = tiles.length;

    // 1行あたりのタイル数（3列）
    const tilesPerRow = 3;

    // 表示する行数のデフォルト（2行）
    const visibleRows = 2;
    const visibleTiles = tilesPerRow * visibleRows;

    // 初期状態を設定
    function initializeScroll() {
        // タイル総数が2行以上の場合のみ「もっと見る」ボタンを表示
        // （将来的に3行以上追加されるときのため）
        if (tileCount > visibleTiles) {
            // スクロール無効化
            worksContainer.style.overflow = 'hidden';
            
            // グリッドの高さを計算（2行分 + ギャップ）
            const firstTile = worksGrid.querySelector('.work-tile');
            const tileHeight = firstTile.offsetHeight;
            const gap = 20; // CSSでの gap サイズ
            const twoRowsHeight = (tileHeight * visibleRows) + (gap * (visibleRows - 1));

            worksGrid.style.height = twoRowsHeight + 'px';
            moreBtn.classList.remove('hidden');
        } else {
            // タイルが2行以下の場合は「もっと見る」ボタン非表示
            moreBtn.classList.add('hidden');
        }
    }

    // 「もっと見る」ボタンのクリックイベント
    moreBtn.addEventListener('click', function() {
        // スクロール有効化
        worksContainer.style.overflow = 'auto';
        worksGrid.style.height = 'auto';

        // ボタン非表示
        moreBtn.classList.add('hidden');
    });

    // ページ読み込み完了時に初期化
    window.addEventListener('load', initializeScroll);

    // ウィンドウリサイズ時に再計算
    window.addEventListener('resize', initializeScroll);
});
