// const express = require("express");
// const { jsPDF } = require("jspdf");
// const cors = require("cors");
// const { Buffer } = require("buffer");
// const fs = require("fs");

// // Path to your Bangla font .ttf file
// const fontPath = "./kalpurush.ttf";

// // Read the file as binary
// const fontData = fs.readFileSync(fontPath);

// // Convert the binary data to Base64
// const base64Font = fontData.toString("base64");
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// function addStyledText(doc, text, x, y, options = {}) {
//   const {
//     fontSize = 12,
//     fontStyle = "normal",
//     align = "left",
//     color = [0, 0, 0],
//   } = options;
//   doc.addFileToVFS("kalpurush.ttf", base64Font); // Replace with actual font name
//   doc.addFont("kalpurush.ttf", "kalpurush", "normal");

//   doc.setFontSize(fontSize);
//   doc.setFont("kalpurush", fontStyle);
//   doc.setTextColor(...color);
//   doc.text(text, x, y, { align });
// }

// // Helper function to draw lines
// function drawLine(doc, x1, y1, x2, y2) {
//   doc.setLineWidth(0.5);
//   doc.line(x1, y1, x2, y2);
// }

// // Endpoint to generate and serve the PDF
// app.get("/generate-pdf", (req, res) => {
//   const doc = new jsPDF();

//   // Title and headers
//   addStyledText(doc, "ঢাকা ব্যাংক পিএলসি", 105, 20, {
//     fontSize: 18,
//     fontStyle: "bold",
//     align: "center",
//   });
//   addStyledText(doc, "রংপুর শাখা", 105, 30, {
//     fontSize: 14,
//     fontStyle: "bold",
//     align: "center",
//   });
//   drawLine(doc, 20, 35, 190, 35); // Underline

//   // Add a few text elements similar to your PDF structure
//   addStyledText(doc, "১। আবেদনকারীর নামঃ মোঃ মাজেদা বেগম", 20, 50, {
//     fontSize: 14,
//   });
//   addStyledText(doc, "বয়সঃ 38 বছর", 20, 60, { fontSize: 14 });

//   // Address Details
//   addStyledText(doc, "২। পিতার নামঃ মোঃ ফিরজল হক", 20, 70, { fontSize: 14 });
//   addStyledText(doc, "৩। পূর্ণ ঠিকানাঃ", 20, 80, { fontSize: 14 });
//   addStyledText(doc, "গ্রামঃ লংকার চর", 30, 90, { fontSize: 12 });
//   addStyledText(doc, "ডাকঘরঃ ...", 30, 100, { fontSize: 12 });
//   addStyledText(doc, "ইউনিয়নঃ Erendabari(এরেন্দাবাড়ী)", 30, 110, {
//     fontSize: 12,
//   });
//   addStyledText(doc, "উপজেলা/থানাঃ Phulchari(ফুলছড়ি)", 30, 120, {
//     fontSize: 12,
//   });
//   addStyledText(doc, "জেলাঃ Gaibandha(গাইবান্ধা)", 30, 130, { fontSize: 12 });

//   // Draw another line
//   drawLine(doc, 20, 135, 190, 135);

//   // Footer with a signature line
//   addStyledText(doc, "আবেদনকারীর স্বাক্ষর/টিপসই:", 20, 250, { fontSize: 14 });
//   drawLine(doc, 70, 248, 130, 248); // Signature line

//   // Output the PDF as a binary stream
//   const pdfOutput = doc.output("arraybuffer");
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     'attachment; filename="styled-user-details.pdf"'
//   );
//   res.send(Buffer.from(pdfOutput));
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/generate-pdf", async (req, res) => {
  // Launch a new instance of Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Path to your Bangla font .ttf file
  const fontPath = path.join(__dirname, "kalpurush.ttf");
  const fontData = fs.readFileSync(fontPath).toString("base64");
  const fontFamily = "Kalpurush";

  // Define the HTML content with embedded custom font
  const htmlContent = `
  <!-- iiii -->
<!DOCTYPE html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document Conversion</title>
    <link rel="stylesheet" href="styles.css" />
    <style>
      @font-face {
        font-family: "${fontFamily}";
        src: url(data:font/ttf;base64,${fontData}) format("truetype");
      }
      body {
        font-family: "Arial", sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
        line-height: 1.6;
      }

      .container {
        background-color: #fff;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .logo {
        width: 150px;
      }

      .header-text {
        text-align: center;
        flex-grow: 1;
        line-height: 0.5;
      }

      .header-text h1 {
        margin: 0;
        font-size: 24px;
        color: black;
      }

      .header-text p {
        margin: 0;
        font-size: 16px;
      }

      .applicant-photo {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid #ddd;
      }

      h2 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
        border-bottom: 2px solid #0a0d10;
        padding-bottom: 10px;
      }

      .form-details p,
      .signature {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
      }

      .land-details {
        max-width: 1200px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      table {
        width: 100%;
        border-collapse: collapse; /* Ensures borders are collapsed into a single border */
        margin: 20px 0;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border: 1px solid #ddd; /* Light gray border for cells */
      }
      thead {
        background-color: #ddd;
      }
      th {
        font-weight: bold;
        border: 1px solid #d1c3c3;
      }
      tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tbody tr:hover {
        background-color: #e0e0e0;
      }
      .total-row {
        font-weight: bold;
        background-color: #d1ecf1;
      }
      .next-page {
        text-align: center;
      }

      @media (max-width: 768px) {
        table {
          font-size: 14px;
        }
      }
      .signature-section {
        line-height: 1; /* Adjust the line height as needed */
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      .signature-section p {
        margin: 5px;
      }
      .n-signature {
        text-align: end;
        margin: 20px;
      }
      .signature-section2 {
        display: flex;
        justify-content: space-between;
      }
      .page-number {
        text-align: center;
      }
      .link {
        color: blue;
        text-align: center;
        align-items: center;
        justify-items: center;
      }
      .nid-card {
        display: flex;
        text-align: center;
      }
      .nid-section {
        display: flex;
        justify-content: space-between;
      }
      .nid-p {
        text-align: center;
      }
      #signature-section-id {
        text-align: end;
        line-height: 1;
      }
      .land-img {
        text-align: center;
      }
      .kho {
        margin-left: 230px;
      }
      .khamar-section {
        text-align: center;
      }
      .bebosthapok {
        align-items: center;
        display: flex;
      }
      .bebosthapok-left {
        line-height: 0.5;
      }
      .bebosthapok-right {
        line-height: 0.5;
        margin-left: 200px;
      }
      .agreement-section {
        margin-left: 100px;
      }
      .nid-img-text {
        display: flex;
        justify-content: center;
      }
      .applicant-photo2 {
        width: 300px;
        height: 300px;
      }
      #page-margin {
        margin-top: 100px;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCSs46uCN_EdHnNtdDSXWlCD0k57n1fuvsiQ&s"
          alt="Dhaka Bank Logo"
          class="logo"
        />
        <div class="header-text">
          <h1>ঢাকা ব্যাংক পিএলসি</h1>
          <h4>রংপুর শাখা</h4>
          <h3>জেলা রংপুর</h3>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
          alt="Applicant Photo"
          class="applicant-photo"
        />
      </div>
      <!-- bebosthapok -->
      <div class="bebosthapok">
        <div class="bebosthapok-left">
          <p>ব্যবস্থাপক</p>
          <p>ঢাকা ব্যাংক পিএলসি</p>
          <p>রংপুর শাখা</p>
          <p>জেলা রংপুর</p>
        </div>
        <div class="bebosthapok-right">
          <p>পাশ বই নং :</p>
          <p>দরখাস্ত গ্রহণের তারিখ :</p>
          <p>লোন কেস নং :</p>
        </div>
      </div>
      <h2>কৃষি ঋণের আবেদনপত্র</h2>

      <section class="application">
        <p>মহোদয়/মহোদয়া,</p>
        <p>
          আমি /আমরা ঢাকা ব্যাংক পিএলসি হইতে ___________________________ কৃষি
          বর্ষের শস্যঋণ গ্রহণে ইচ্ছুক এবং এতদুদ্দেশ্য নিম্নলিখিত তথ্যা বলী
          সরবরাহ করিতেছি ।
        </p>
        <p><strong>১। আবেদনকারীর নামঃ</strong> মোঃ মাজেদা বেগম , বয়সঃ 38 বছর</p>
        <p><strong>২। পিতা /স্বামীর নামঃ</strong> মোঃ ফরিজল হক</p>
        <p>
          <strong> ৩। পূর্ণ ঠিকানাঃ </strong>গ্রামঃ লংকারচর, ডাকঘরঃ
          .........................., ইউনিয়নঃ Erendabari(এরেন্ডাবাড়ী ), উপজেলা
          /থানাঃ Phulchari(ফুলছড়ি ), জেলাঃ Gaibandha(গাইবান্ধা )
        </p>
        <p>৪। চাষাধীন জমি ও উৎপাদিত ফসলের বিস্তারিত বিবরণ।</p>
      </section>
      <section class="land-details">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>মৌজার নাম</th>
              <th>খতিয়ান নং</th>
              <th>দাগ নং</th>
              <th>জমির পরিমাণ (শতক)</th>
              <th>উৎপাদিত ফসলের নাম</th>
              <th>ঋণের পরিমাণ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>(ক) নিজ মালিকানাধীনঃ</td>
              <td>ডাকাতিয়ার চর</td>
              <td>155</td>
              <td>849, 850</td>
              <td>200</td>
              <td>Maize</td>
              <td>৳ 127,272</td>
            </tr>
            <tr>
              <td>(খ) বর্গা চাষাধীনঃ</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>সর্বমোট</td>
              <td></td>
              <td></td>
              <td></td>
              <td>200</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <p>
        <strong> ৫। ঋণের জামানতঃ</strong> প্রার্থীত ঋণের বিপরীতে উৎপাদি তব্য ও
        উৎপাদিত সকল শস্য ব্যাংকের নিকট বন্ধকী ।
      </p>
      <p>
        <strong> ৬। পরিশোধ পদ্ধতিঃ </strong> সংশ্লিষ্ট শস্য ঋণ গ্রহণের দিন থেকে
        ব্যাংক কর্তৃক নির্ধারিত সময়ের মধ্যে সুদ ও ঋণের মেয়াদ সার্ভিস চর্জ সমেত
        পরিশোধ যোগ্য ।
      </p>
      <p><strong>৭। বর্তমান দায়/দেনার পরিমানঃ</strong></p>
      <p id="page-margin">(১) অপরিশোধিত ঋণের পরিমাণঃ (ক) মোট ঋণঃ</p>
      <p class="kho">(খ) পরিশোধঃ</p>
      <p>(২) ঋণদানকারী প্রতিষ্ঠানের নামঃ</p>
      <p>
        ৮। আমি / আমরা এই মর্মে ঘোষণা করিতেছি যে , অত্র আবেদনপত্রে দাখিলকৃত সমস্ত
        তথ্যা বলী সম্পূর্ণ নির্ভুল ও সত্য । আমি /আমরা এই মর্মে প্রতিশ্রুতি ও
        অংগীকার করিতেছি যে , মঞ্জুরী কৃতঋণ উৎপাদিতব্য নির্দিষ্ট ফসল উৎপাদনের
        কাজে যথা যথ ব্যবহার করিব এবং এই অর্থ কোন ক্রমেই অন্য কোন অনুৎপাদনমূলক
        কাজে ব্যবহার করিব না । আমি /আমরা আরও অংগীকার করিতেছি যে , মঞ্জুরকৃত ঋণের
        পরিপ্রেক্ষিতে ব্যাংক আরোপিত সকল শর্তবলী যথা যথ মানিয়া চলিব এবং গৃহীত ঋণ
        উৎপাদিত ফসল বিক্রয় করিয়া সময়মত সুদসহ পরিশোধ করিব। না করিলে পাবলিক ডিম
        ন্ড রিকভারী এক্ট ১৯১৩-এর আওতায় সার্টিফিকেটকেসের মাধ্যমে ব্যাংক আমার নিকট
        হইতে সমুদয় পাওনা আদায়ে ব্যবস্থা করিতে পারিবে ন।
      </p>
      <div class="signature">
        <p>তারিখ ...............</p>
        <div class="signature-section">
          <p>আবেদনকারীর স্বাক্ষর/টিপসহি</p>
          <p>(টিপসহি সনাক্ত করিতে হইবে )</p>
        </div>
      </div>
      <p class="next-page">(অপর পৃষ্ঠায় দেখুন)</p>

      <!-- another page -->
      <p class="page-number">(পাতা-২)</p>
      <p>
        <strong> ৯। মাঠকর্মী /পরিদর্শনকারীর সুপারিশঃ </strong>আবেদনকারী কর্তৃক
        উপরোক্ত তথ্যাবলী জমি সরেজমিনে পরিদর্শন করিয়া সন্তুষ্ট হইয়াসনদ প্রদান
        করিতেছি যে , বর্ণিত তথ্যাবলী সত্য ও নির্ভুল। আবেদনকারীকে মৌসুমে
        নিম্নোক্ত শস্যাদি উৎপাদনের লক্ষ্যে ৳ 127,272 টাকা ঋণ মঞ্জুরী রসুপারিশ
        করিতেছি ।
      </p>

      <section>
        <table>
          <thead>
            <tr>
              <th>ফসলের নাম</th>
              <th>খাত</th>
              <th>ঋণের পরিমাণ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maize</td>
              <td>সার, বীজ, কীটনাশক</td>
              <td></td>
            </tr>
            <tr class="total-row">
              <td><strong>সর্বমোট</strong></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <p class="n-signature">মাঠকর্মী /সুপারিশকারীর স্বাক্ষর</p>
      <p>
        <strong> ১০। ঋণ মঞ্জুরকারী কর্মকর্তার অংশঃ </strong>
      </p>
      <p>(ক) মঞ্জুরকৃত মোট ঋণ মাত্রা ________________________________</p>
      <p>
        (খ) মঞ্জুরীর তারিখঃ...................................................
        (গ) জামানতঃ উৎপাদিত শস্য ও মজুদ শস্যাবলী ।
      </p>
      <p>
        (ঘ) সুদের হারঃ যখন যে হার প্রযোজ্য /বার্ষিক 4% সরল হারে সুদ আরোপিত হবে ।
        নির্দিষ্ট দিন তারিখ বা পরবর্তী 6 মাসের মধ্যে ঋণ পরিশোধ করিলে ২% রিবেট
        দেওয়া হইবে , অন্যথায় ঋণ বিতরণের প্রথম তারিখ হইতে চক্রবৃদ্ধি হারে সুদ
        আরোপিত হইবে ।
      </p>
      <p>(ঙ) ফসলওয়ারী ঋণের পরিমানঃ</p>
      <section>
        <table>
          <thead>
            <tr>
              <th>ফসলের নাম</th>
              <th>নগদ টাকা</th>
              <th>দ্রব্য টাকায়</th>
              <th>মোট টাকা</th>
              <th>ঋণ বিতরনের সময়</th>
              <th>পরিশোধের সময়</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>১। Maize</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>6 মাস</td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2></h2>
      <div class="signature-section2">
        <p>তারিখ.........</p>
        <p>ঋণ মঞ্জুরকারী কর্মকর্তার স্বাক্ষর</p>
      </div>
      <p>
        ১১। যেহেতু আমাকে /আমাদিগকে ঢাকা ব্যাংক পিএলসি হইতে ১০ নং অনুচ্ছেদে
        বর্ণিত শর্তাবলীতে মোট_______________________________________ শস্য ঋণ
        মঞ্জুর করা হইয়াছে সেহেতু আমি /আমরা এতদ্বারা অংগীকার করিতেছি যে , আমার/
        আমাদের আবেদনপত্র বর্ণিততপশীলের জমিতে যে শস্যাদি উৎপন্ন হইতেছে /হইবে
        তদসমুদয় উৎপাদিত এবং মজুদশস্যা দিযা হা আমার নিজ হেফাজতে বা অন্য কাহারো
        হেফাজতে আছে /থাকিবে বা অন্য স্থানে নিতে হইতেছে বা হইবে তাহা উক্ত শস্যাদি
        অথবা আবেদন পত্রে উল্লেখিত নিজ মালিকানাধীন জমি বিক্রয় করিয়া ব্যাংকের ঋণ
        বাবদ পাওনা আসল ও সুদ ওয়াশীল করিয়া নিতে পারিবেন। ইহা তে আমার/আমাদের কোন
        ওজর আপত্তি থাকিবেনা , কোন আপত্তি থাকলে তাহা আইনত আগ্রাহ্য হইবে । ব্যাংক
        হইতে গৃহীত ঋণ পরিশোধ না করা পর্যন্ত তফশীল বর্ণিত নিজ মালিকানাধীন জমি
        কাহারো নিকট দায়বদ্ধ/হস্তান্তর করিব না এবং জমির খাজনাদি নিয়মিত পরিশোধ
        করিব। উপরোক্ত শর্তাবলীতে ব্যাংক কর্তৃকমঞ্জুরীকৃত মোট
        _____________________________ ঋণের জন্য অত্র দলিল স্বেচ্ছায় ও স্বজ্ঞানে
        সম্পাদন করিলাম।
      </p>
      <p>সাক্ষীর স্বক্ষরঃ (ঠিকানাসহ)</p>
      <div class="signature-section2">
        <div class="agreement-section">
          <p>(ক)</p>
          <p>(খ)</p>
          <p>চুক্তি সম্পাদনের তারিখঃ</p>
        </div>
        <div class="signature-section">
          <p>ঋণগ্রহীতার স্বাক্ষর/টিপসহি</p>
          <p>(টিপসহি সনাক্ত করিতে হইবে )</p>
        </div>
      </div>
      <p>
        ১২। জামিনদারের হলফনা মাঃ (বর্গাচাষীর ক্ষেত্রে প্রযোজ্য ) আমি এই মর্মে
        নিশ্চয়তা প্রদান করিতেছি যে , উপরোক্ত ঋণ গ্রহীতার অনুকূলে মঞ্জুরী কৃত
        _____________________________ ঋণ যথা সময়ে সুদ ও অন্যান্য খরচাদি সহ
        পরিশোধ করা না হইলে আমি ঋণ গ্রহীতার পক্ষে জামিনদার হিসাবে উক্ত ঋণের সমূদয়
        টাকা সুদ সমেত ব্যাংক কর্তৃক চাহিবা মাত্র পরিশোধ করিতে বাধ্য থাকিব।
      </p>
      <!-- another page -->
      <p class="next-page">(অপর পৃষ্ঠায় দেখুন)</p>
      <p class="page-number">(পাতা-৩)</p>
      <p><strong>কৃষকের সম্পত্তির তথ্যঃ</strong></p>
      <section>
        <table>
          <thead>
            <tr>
              <th>সম্পত্তির ধরণ</th>
              <th>সম্পত্তির সংখ্যা</th>
              <th>সম্পত্তির মূল্য</th>
              <th>মন্তব্য</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>livestock</td>
              <td>2</td>
              <td>৳ 200,000</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><strong>মোটঃ ৳ 200,000</strong></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <p><strong>সম্পত্তির ছবিঃ</strong></p>
      <div>
        <div class="khamar-section">
          <div>
            <img
              src="https://www.lalmonirhatbarta.com/media/imgAll/2018November/Dinajpur-cow-khamar-news-pic-1908030729-1908031920.jpg"
              alt="khamar"
            />
          </div>
          <a class="link" href="/">গুগল ম্যাপে দেখুন </a>
        </div>
      </div>
      <h2></h2>
      <p><strong>জামিনদার (1) এর তথ্যঃ</strong></p>
      <div class="nid-section">
        <div class="nid-img-text">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvwJG3J0AvDmbaE8_obrEW5IHHEB2zDaYEw&s"
              alt="user-img"
              class="applicant-photo2"
            />
            <div class="signature-section">
              <p>নামঃ মোছাঃ বেগম</p>
              <p>এন.আই.ডি. নংঃ 3911529892106</p>
              <p>ঠিকানাঃ লংকার চর বয়সঃ</p>
              <p>বয়সঃ 51 বছর</p>
              <p>মোবাইল নংঃ (+88) 01304-805-342</p>
              <p>সম্পর্কঃ মা (Mother)</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p class="nid-p"><strong>এন.আই.ডি</strong>/p></p>
            <div class="nid-card">
              <div>
                <img
                  src="data:image/jpeg;base64,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"
                  alt="front-side"
                />
                <p>সামনের দিক</p>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJA9l6DJL78wzz3-I82bXRaJrhTAMw86zB8A1WRup4zYiKeulA-mBpzj_fBkVGMnHrZc&usqp=CAU"
                    alt="back-side"
                  />
                  <p>পিছনের দিক</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="signature-section-id">
        <p>..............................</p>
        <p>স্বাক্ষর</p>
      </div>
      <p>
        <strong>সম্পত্তির তথ্যঃ</strong>
      </p>
      <section>
        <table>
          <thead>
            <tr>
              <th>সম্পত্তির ধরণ</th>
              <th>সম্পত্তির সংখ্যা</th>
              <th>সম্পত্তির মূল্য</th>
              <th>মন্তব্য</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>livestock</td>
              <td>2</td>
              <td>৳ 200,000</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><strong>মোটঃ ৳ 200,000</strong></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <p><strong>সম্পত্তির ছবিঃ</strong></p>
      <div class="land-img">
        <img
          src="https://t4.ftcdn.net/jpg/04/36/23/41/360_F_436234154_GyTM8dZBFljIAL6p8tkdEfFc96J7KOKR.jpg"
          alt="land"
        />
      </div>
    </div>
  </body>
</html>




  `;

  // Set the HTML content and generate the PDF
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  // Send the PDF as a response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="styled-user-details.pdf"'
  );
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
