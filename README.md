# 指定デザイン＋アコム4位追加版

指定された`new-lp-v2-demo`の4ページをそのまま土台にし、既存3社の後ろへアコムを4位で追加した比較サイトです。独自のレイアウト変更は行わず、既存のV2カード生成・比較表・アンケート・テーマを維持しています。

## ページ

- `index.html?select_modal=2&v=final2`: 経験者TOP
- `result_v2.html?variant=experienced&v=final2`: 経験者向け検索結果
- `mobit_beginner.html?v=final2`: はじめてTOP
- `beginner_result_v2.html?variant=beginner&v=final2`: はじめて向け検索結果
- `redirect.html`: 静的環境用の広告中継ページ
- `redirect.php`: PHP環境用の広告中継
- `operationinfo.html`: 運営者情報
- `demo-list.html`: 確認用ページ一覧

## ローカル確認

プロジェクトルートで次を実行し、`http://127.0.0.1:4173/demo-list.html`を開きます。

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

## 再利用元（読み取り専用）

`C:\Users\sosuk\OneDrive\会社デスクトップPC\デスクトップ-DESKTOP-O4KOVSK\Codex\new-lp-v2-fixes-20260713`

ロゴ、favicon、公式バナー、商品数値、商品注釈、PR表記、4商品のredirect URLを再利用しています。GTM・Meta等の計測タグ、旧ランキング、非表示カードは現在のページへ接続していません。

2026-07-16の追加指示により、0713版のアセット一式（`css/`、`js/`、`images/`、`source-assets/`、`favicon.ico`）を参照用スナップショットとしてコピーしています。現在のページは引き続き`css/site.css`と`js/site.js`のみを読み込み、0713版の旧CSS・JSは未接続です。

## 公開

静的ホスティングでは全ファイルを同一階層構成で配置します。PHPが利用できる場合はCTAを`redirect.php`へ切り替え可能です。公開前に各社公式情報とアフィリエイト契約条件を再確認してください。
