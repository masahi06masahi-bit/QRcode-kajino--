// QRコードジェネレーター //
// 変数 //
const QR_QRcode_Generator_input_text_check_text = /^[USAT]\d{2}-\d{5}$/ 
const QR_QRcode_Generator_result = document.getElementById("QR_QRcode_Generator_result");
const QR_QRcode_Generator_input_text = document.getElementById("QR_QRcode_Generator_input_text");
const QR_QRcode_Generator_button = document.getElementById("QR_QRcode_Generator_button");
const QR_QRcode_Generator_image = document.getElementById("QR_QRcode_Generator_image");
const QR_QRcode_Generator_image_context = QR_QRcode_Generator_image.getContext("2d");
const QR_QRcode_Generator_PNG_image =document.getElementById("QR_QRcode_Generator_PNG_image");
const download = document.createElement("a");
let QR_QRcode_Generator_pngData = null ;
let QR_QRcode_Generator_input_text_check_result = null ;

// 画像サイズの設定 
QR_QRcode_Generator_image.width = 2000;
QR_QRcode_Generator_image.height = 2440;
// WEB表示サイズ
QR_QRcode_Generator_PNG_image.style.width = "200px";
QR_QRcode_Generator_PNG_image.style.height = "244px";
QR_QRcode_Generator_PNG_image.style.maxWidth = "200px";

//　関数 //
// QRコードジェネレーター // 
function QR_QRcode_Generator() {
    // 古いPNGを削除
    QR_QRcode_Generator_PNG_image.src = "";
    QR_QRcode_Generator_pngData = null;

    QR_QRcode_Generator_input_text_check();
    
    // 以前のQRコードを削除
    QR_QRcode_Generator_result.innerHTML = "";

    // Canvasを消去
    QR_QRcode_Generator_image_context.clearRect(
        0,
        0,
        QR_QRcode_Generator_image.width,
        QR_QRcode_Generator_image.height
    );
    // キャンパスを白く
    QR_QRcode_Generator_image_context.fillStyle = "white";
        QR_QRcode_Generator_image_context.fillRect(
        0,
        0,
        QR_QRcode_Generator_image.width,
        QR_QRcode_Generator_image.height
    );


    if (QR_QRcode_Generator_input_text_check_result === true){
        new QRCode(QR_QRcode_Generator_result, {
        text: QR_QRcode_Generator_input_text.value,
        width: 2400,
        height: 2400
    });
    QR_QRcode_Generator_wait();
    }
    
}





function QR_QRcode_Generator_wait() {
    // QRコードを挿入 //
    const QR_QRcode_Generator_qrImage = QR_QRcode_Generator_result.querySelector("img");
    
    // QRコードが存在するか確認
    if (QR_QRcode_Generator_qrImage === null ||
        !QR_QRcode_Generator_qrImage.complete||
        QR_QRcode_Generator_qrImage.naturalWidth === 0
    ) {
        setTimeout(QR_QRcode_Generator_wait,5);
        return;
    }

    QR_QRcode_Generator_image_context.drawImage(QR_QRcode_Generator_qrImage, 200, 400, 1600, 1600);

    // ID及び文字を挿入 //
    QR_QRcode_Generator_image_context.fillStyle = "Black" ;
    QR_QRcode_Generator_image_context.font = "160px sans-serif";
    QR_QRcode_Generator_image_context.textAlign = "center";
    QR_QRcode_Generator_image_context.fillText(
    QR_QRcode_Generator_input_text.value,
    1000,
    2300
    );
        QR_QRcode_Generator_image_context.fillStyle = "Black" ;
    QR_QRcode_Generator_image_context.font = "160px sans-serif";
    QR_QRcode_Generator_image_context.textAlign = "center";
    QR_QRcode_Generator_image_context.fillText(
    "カジノ",// ←この文字は上部に表示する
    1000,
    300
    );

    // QRcodeとIDがそろったのでPNG化 //
    QR_QRcode_Generator_pngData = QR_QRcode_Generator_image.toDataURL("image/png");
    QR_QRcode_Generator_PNG_image.src = QR_QRcode_Generator_pngData;
    download.href = QR_QRcode_Generator_pngData;


    // 押したらダウンロード //
    download.download = QR_QRcode_Generator_input_text.value + ".png";
};
    
// 入力値検査 //
function QR_QRcode_Generator_input_text_check() {
    if (QR_QRcode_Generator_input_text_check_text.test(QR_QRcode_Generator_input_text.value)){
        QR_QRcode_Generator_input_text_check_result = true
    }
    else {
        QR_QRcode_Generator_input_text_check_result = false
    }
    return (QR_QRcode_Generator_input_text_check_result);

} 

// 以降実行 //
QR_QRcode_Generator_button.addEventListener("click" , 
    QR_QRcode_Generator
);
QR_QRcode_Generator_PNG_image.addEventListener("click", function() {
    if (QR_QRcode_Generator_pngData !== null) {

    download.click();
}
});