import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const canonicalPages = [
  "index.html",
  "result_v2.html",
  "mobit_beginner.html",
  "beginner_result_v2.html"
];
const cardsJs = fs.readFileSync(path.join(root, "js/result-cards-v2.js"), "utf8");

if (!cardsJs.includes('["mobit", "aiful", "promise", "acom"]')) {
  throw new Error("V2 lender order is not Mobit, Aiful, Promise, Acom");
}
if (!cardsJs.includes('const rankMarks = ["♛", "♛", "♛", "④"]')) {
  throw new Error("Acom does not use the No.4 rank mark");
}
for (const text of [
  'catch: "はじめてなら30日間金利0円"',
  '["融資時間", "最短20分"]',
  '["実質年率", "2.4％～17.9％"]',
  '["利用限度額", "最大800万円"]',
  '["無利息期間", "契約日の翌日から30日間"]',
  '["利用方法", "振込・コンビニATM"]',
  'reviewProfile: "職業：会社員<br>年齢：25歳"',
  'reviewAmount: "100万～300万円未満"',
  'reviewTime: "1時間以内"',
  'cta: "はじめての方はこちらから申し込む"'
]) {
  if (!cardsJs.includes(text)) throw new Error(`Missing Acom content: ${text}`);
}

for (const page of canonicalPages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes("data-v4-result-cards")) throw new Error(`${page}: missing V2 cards mount`);
  if (!html.includes("result-cards-v2.js")) throw new Error(`${page}: missing V2 cards script`);
}

for (const page of ["index.html", "mobit_beginner.html"]) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const table = html.match(/<table class="v3-compare2-table">[\s\S]*?<\/table>/)?.[0] || "";
  const headers = [...table.matchAll(/class="v3-compare2-product[^\"]*"/g)];
  if (headers.length !== 4) throw new Error(`${page}: expected four comparison products`);
  if (!table.includes("SMBCモビット、アイフル、プロミス、アコムの比較表")) throw new Error(`${page}: bad comparison caption`);
  if (!table.includes("redirect.php?item=acom")) throw new Error(`${page}: missing Acom table CTA`);
}

const redirect = fs.readFileSync(path.join(root, "redirect.html"), "utf8");
for (const sensitive of ["income", "job", "amount", "current_loans", "company_size", "duration", "priority"]) {
  if (new RegExp(`allowed[^;]*${sensitive}`).test(redirect)) throw new Error(`sensitive redirect key: ${sensitive}`);
}

const compareCss = fs.readFileSync(path.join(root, "css/mobit-compare2.css"), "utf8");
if (!compareCss.includes("width: calc(86% / 4);")) throw new Error("Mobit outline is not aligned to four columns");
if (!compareCss.includes("width: calc((100% - 50px) / 4);")) throw new Error("Mobile Mobit outline is not aligned to four columns");
const surveyJs = fs.readFileSync(path.join(root, "js/survey.js"), "utf8");
if (!surveyJs.includes("あなたに合ったカードローンを</span><span>検索中…")) throw new Error("Search loading line break is missing");

console.log("contract ok: 4 source-based pages, Acom fixed at No.4, two 4-company tables");
