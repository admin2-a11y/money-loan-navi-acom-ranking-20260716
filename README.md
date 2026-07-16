# アコム推し 4社比較LP

既存マネーローンナビのUIトーンと商品情報を参照し、独立実装した静的比較サイトです。全TOP・結果ページの順位は、回答内容にかかわらず「アコム → SMBCモビット → プロミス → アイフル」で固定しています。

## ページ

- `index.html`: 経験あり／はじめての入口
- `experienced.html`: 経験者TOP（青テーマ）
- `beginner.html`: はじめてTOP（グリーンテーマ）
- `experienced-result.html`: 経験者向け検索結果
- `beginner-result.html`: はじめて向け検索結果
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

ロゴ、favicon、公式バナー、商品数値、商品注釈、PR表記、4商品のredirect URLを再利用しています。GTM・Meta等の計測タグ、旧ランキング、非表示カード、不要画像は移植していません。

## 公開

静的ホスティングでは全ファイルを同一階層構成で配置します。PHPが利用できる場合はCTAを`redirect.php`へ切り替え可能です。公開前に各社公式情報とアフィリエイト契約条件を再確認してください。
