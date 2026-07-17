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
const acomBlock = cardsJs.match(/key: "acom"[\s\S]*?key: "promise"/)?.[0] || "";

if (!cardsJs.includes('["acom", "promise", "mobit", "aiful"]')) {
  throw new Error("V2 lender order is not Acom, Promise, Mobit, Aiful");
}
if (!cardsJs.includes('const rankMarks = ["♛", "♛", "♛", "4"]') || !cardsJs.includes('is-fourth-medal')) {
  throw new Error("The No.4 lender does not use the medal illustration");
}
if (!cardsJs.includes('[data-v4-lender="acom"]') || !cardsJs.includes("data-v4-final-acom")) {
  throw new Error("Acom is not configured as the final recommendation");
}
for (const text of [
  'catch: "はじめてなら30日間金利0円"',
  '["実質年率", "2.4％～17.9％"]',
  '["利用限度額", "最大800万円"]',
  '["利用方法", "振込・コンビニATM"]',
  'reviewProfile: "職業：会社員<br>年齢：25歳"',
  'reviewAmount: "100万～300万円未満"',
  'reviewTime: "1時間以内"',
  'cta: "30日間金利0円で申し込む", ctaRef: "※3", bannerRef: "※1"',
  '["融資時間", "最短20分", "※1"]',
  '["無利息期間", "契約日の翌日から30日間", "※3"]',
  '["審査結果が最短20分でわかる！", "21時までに申し込めば当日中に口座に振込！土日祝も24時間申込可能", "※1", "※2"]',
  '※1 お申込時間や審査によりご希望に添えない場合がございます。',
  '※2 金融機関・お申込時間帯によってはご利用いただけない場合がございます。',
  '※3 アコムでのご契約がはじめてのお客さま'
]) {
  if (!cardsJs.includes(text)) throw new Error(`Missing Acom content: ${text}`);
}
for (const forbidden of ["アコムを初めて契約する方が無利息期間の対象です。", "審査状況"] ) {
  if (acomBlock.includes(forbidden)) throw new Error(`Deprecated Acom note remains: ${forbidden}`);
}
if (!cardsJs.includes("※一例であり、結果を保証するものではありません。")) throw new Error("Existing review disclaimer changed");

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
  if (!table.includes("アコム、プロミス、SMBCモビット、アイフルの比較表")) throw new Error(`${page}: bad comparison caption`);
  const companyOrder = [...table.matchAll(/<b>(アコム|プロミス|SMBCモビット|アイフル)<\/b>/g)].map((match) => match[1]);
  if (companyOrder.join(",") !== "アコム,プロミス,SMBCモビット,アイフル") throw new Error(`${page}: bad comparison order`);
  if (!table.match(/v3-compare2-product is-featured[\s\S]*?<b>アコム<\/b>/)) throw new Error(`${page}: Acom is not featured`);
  if (!table.includes("redirect.php?item=acom")) throw new Error(`${page}: missing Acom table CTA`);
}

const redirect = fs.readFileSync(path.join(root, "redirect.html"), "utf8");
for (const sensitive of ["income", "job", "amount", "current_loans", "company_size", "duration", "priority"]) {
  if (new RegExp(`allowed[^;]*${sensitive}`).test(redirect)) throw new Error(`sensitive redirect key: ${sensitive}`);
}

const compareCss = fs.readFileSync(path.join(root, "css/mobit-compare2.css"), "utf8");
if (compareCss.includes("#fff4f1") || compareCss.includes("#fff0f2")) throw new Error("Pink comparison header backgrounds remain");
if (!compareCss.includes(".v3-compare2-table thead tr:last-child th") || !compareCss.includes("border-bottom: 2px solid #c7cdd2 !important;")) throw new Error("Comparison header divider is missing");
if (!compareCss.includes(".v3-compare2-table thead .v3-compare2-product:not(.is-featured)") || !compareCss.includes("background: #fff;")) throw new Error("Non-featured comparison headers are not white");
if (!compareCss.includes("width: calc((86% / 4) + 8px);")) throw new Error("Mobit outline does not preserve the desktop column width");
if (!compareCss.includes("width: calc(((100% - 50px) / 4) + 8px);")) throw new Error("Mobit outline does not preserve the mobile column width");
const surveyJs = fs.readFileSync(path.join(root, "js/survey.js"), "utf8");
if (!surveyJs.includes("あなたに合ったカードローンを</span><span>検索中…")) throw new Error("Search loading line break is missing");

console.log("contract ok: four pages rank Acom, Promise, Mobit, Aiful with Acom recommended");
