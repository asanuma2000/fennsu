const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let step = 0;
let data = {};

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function botAsk(text) {
    addMessage(text, "bot");
}

function nextStep() {
    step++;

    if (step === 1) botAsk("延長を入力してください（例：20）");
    else if (step === 2) botAsk("高さを入力してください（例：H1000）");
    else if (step === 3) botAsk("メーカー名を入力してください（例：LIXIL）");
    else if (step === 4) botAsk("フェンスの種類を入力してください（例：ハイグリッドUF8）");
    else if (step === 5) botAsk("コーナー数を入力してください（例：2）");
    else if (step === 6) botAsk("端部数を入力してください（例：2）");
    else if (step === 7) botAsk("支柱ピッチを選んでください（1 または 2）");
    else if (step === 8) calculate();
}

function calculate() {
    const L = Number(data.length);
    const pitch = Number(data.pitch);

    const posts = Math.ceil(L / pitch) + 1;
    const panels = posts - 1;

    botAsk("計算結果です！");
    botAsk(
        `支柱本数：${posts}\n` +
        `パネル枚数：${panels}\n` +
        `コーナー：${data.corner}\n` +
        `端部：${data.end}`
    );
}

sendBtn.addEventListener("click", () => {
    const text = userInput.value;
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    if (step === 1) data.length = text;
    else if (step === 2) data.height = text;
    else if (step === 3) data.maker = text;
    else if (step === 4) data.type = text;
    else if (step === 5) data.corner = text;
    else if (step === 6) data.end = text;
    else if (step === 7) data.pitch = text;

    nextStep();
});

// 最初の質問を表示
nextStep();
