export interface ProjectItem {
  title: string;
  image: string;
  imageFallback: string;
  intro: string[];
}

export type ProjectMap = Record<string, ProjectItem>;

export const PROJECTS: ProjectMap = {
  "c-lang-ai": {
    title: "C 語言線上 AI 互動學習平台",
    image: "images/projects/c-lang-ai.png",
    imageFallback: "images/projects/c-lang.png",
    intro: [
      `📝傳統的學習方式或解題系統雖然提供大量題目練習，但通常只判斷「對」或「錯」，缺乏針對學習者的思路與解題過程進行深入說明，也缺乏可以幫助我們理解錯誤、改善程式邏輯的輔助機制。 因此，希望設計一個更適合使用者需求的學習平台。這個平台不只是單純的線上編譯、解題系統，更是結合了 AI 輔助功能，可以即時檢查程式錯誤、提供修正建議，甚至以更有效率的方式引導學生學習。`,
      `📈以結構化程式設計之三卡模式:
      (1)學習文檔依主題整理:變數、陣列、指標、記憶體管理等，方便使用者循序閱讀
      (2)線上練功房設有豐富的練習題庫，使用者可自行選擇練習
      (3)學習進度追蹤讓使用者掌握章節完成度、學習時數、答題數，若有不足的地方可以重複練習`,
      `💻編譯器使用 GCC 編譯工具，考慮到實際練習程式的時候，會常常需要看到 output ，因此我們使用 websocket 模擬一個終端，顯示編譯結果，讓使用者可以使用 stdio 的方式測試程式`,
      `🏴‍☠️在開發登入功能時應考慮資安問題，處理 SQL 指令查詢應使用參數對照做基本防範，惡意程式碼才不會被當成指令。此外帳號密碼等使用者敏感資訊也不應以明文儲存在資料庫，而是使用雜湊值做加密保護。`,
      `🚩由於 C 語言提供了許多低階操作、作業系統的功能，為了讓使用者能夠更深入地理解電腦如何處理資料，我們開發了追蹤程式的雛形，繪製出記憶模擬圖，讓使用者瞭解程式碼每一步驟發生的變化。`
    ],
  },
  assembler: {
    title: "基於 Python 的簡單組譯器 (SIC Two-Pass Assembler)",
    image: "images/projects/assembler.png",
    imageFallback: "images/projects/assembler.png",
    intro: [
      `⚙️ 架構:標準 Two-Pass 組譯機制
        本專案使用 Python 自主實作標準 SIC (Simplified Instructional Computer) 雙階段組譯器。
        • Pass 1(建立符號表與中間檔): 解析原始碼語法結構，精確計算 LOCCTR(程式計數器)位址，支援自由格式編碼、註解與空行過濾，並動態建構符號表(Symbol Table)與包含定址模式的中間檔(Intermediate File)。
        • Pass 2(目標碼生成與分頁打包): 載入中間檔與指令對照表(OpCode Table)，將助記詞與運算元轉譯為 16 進制 Machine Code 自動組裝為 Header (H)、Text (T) 及 End (E) 記錄格式的 Object Program(.txt)。`,

      `🛡️ 嚴謹的語法檢查與多重錯誤累積機制
        不同於遇到錯誤即閃退的簡易組譯器，本系統實作了編譯器等級的容錯與錯誤累積(Error Accumulating)機制，能在終端機精準指出出錯行號，並在發現語法異常時立即阻斷目標檔輸出:
        • 指令與運算元驗證: 嚴禁 Label 或 Operand 使用保留助記詞(如 JEQ, LDA)，檢驗 RSUB 不得攜帶 Operand 等細節規則。
        • 常數與型別防禦: 嚴格限制 WORD / RESW / RESB 運算元必須為合法十進制整數 BYTE X 僅接受偶數長度之合法 16 進位字串且不可為空 BYTE C 則支援含空白字元內容的 ASCII 自動編碼轉換。
        • 符號表衝突檢測: 支援重複定義標籤(Redefined Label)與未宣告符號(Undefined Label)之即時攔截。`,

      `🔧 彈性定址與記憶體佈局支援
        • 多重定址模式: 支援直接定址(Direct Addressing)與索引定址(Indexed Addressing, 如 BUFFER,X)，並能自動容忍逗點前後的不規則空白。在索引定址時自動對最高位元進行 OR 運算(| 0x8000)正確產生對應目標碼。
        • 動態程式起始與跳躍: 支援由 START 偽指令自訂起始記憶體位址(如 1000H 或 3000H)，以及透過 END 指定執行進入點 Label 整段程式長度與分頁位址皆會動態重新計算並精確對齊。`,
    ],
  },
  "foodcleaner": {
    title: "好好食反 (冰箱清道夫) - 個人專屬 AI 飲食健康管家",
    image: "images/projects/foodcleaner.jpg",
    imageFallback: "images/projects/foodcleaner.jpg",
    intro: [
      `💡 專案初衷與痛點解決
        為了解決現代人「冰箱剩食不知如何處理、容易過期浪費」以及「傳統飲食與熱量紀錄 App 輸入繁瑣、難以持之以恆」的生活痛點，本專案打造了一套整合 LINE Bot 的零門檻智慧健康管家。使用者只需隨手拍照，系統便能自動區分情境，提供個人化食譜推薦與即時熱量分析。`,

      `🍳 雙軌視覺判斷與 RAG 食譜即時檢索
        • 生熟食智慧分流: 透過多模態 GPT-4o-mini 視覺分析，自動辨識圖片為「生鮮食材 (raw)」或「餐點成品 (cooked)」。
        • 聯網檢索消除幻覺 (RAG): 針對生鮮食材，整合 Google Custom Search API 即時檢索 Cookpad 台灣站的真實家常菜食譜，並以循序檢索機制精準命中；再交由 AI 結合台灣在地用語(如鮭魚、花椰菜)輸出結構化料理步驟與參考來源。
        • 互動確認機制: 食譜生成後透過 LINE Quick Reply 詢問滿意度，使用者點選滿意才將該道菜存入 Firestore 歷史記憶中。`,

      `📊 對話狀態機與 LIFF 視覺化營養儀表板
        • 狀態機補充說明: 針對熟食成品，系統自動建立暫存狀態(waiting_for_desc)並主動詢問細節。使用者可補充文字(如:搭配冬瓜茶、起司醬) AI 即時動態重新命名餐點並重估整體熱量與營養短評。
        • 個人專屬飲食設定: 支援動態記錄過敏原與飲食目標(如:SET:我對蝦子過敏、正在減肥)，自動注入 System Prompt 確保食譜安全避雷。
        • LIFF 響應式圖表: 導入 LINE Front-end Framework (LIFF) 與 Chart.js 在 LINE 對話框內直接滑出半透明專屬網頁，透過 Flask API 串接 Firestore 資料庫，直觀展示近期熱量攝取長條圖。`,
    ],
  },
};