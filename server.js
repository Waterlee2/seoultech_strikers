// server.js
require("dotenv").config();

const express = require("express");
const path = require("path");
const { ocrHandler } = require("./api/ocr");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/ocr", ocrHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log("========================================");
  console.log(`  로컬몬 서버 실행 중`);
  console.log(`  http://localhost:${PORT}` );
  console.log("========================================");
  if (!process.env.OPENAI_API_KEY) {
    console.warn("\n  [경고] OPENAI_API_KEY 가 설정되지 않았습니다.");
    console.warn("  .env 파일에 OPENAI_API_KEY=sk-... 를 추가하세요.\n");
  }
});
