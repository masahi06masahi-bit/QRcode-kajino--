// QRコードリーダー //
// 変数を定義 //
const QR_QRcode_reader_button = document.getElementById("QR_QRcode_reader_button");
const QR_QRcode_reader_result = document.getElementById("QR_QRcode_reader_result");

const QR_QRcode_GAS_URL =
"https://script.google.com/macros/s/AKfycbwwDMSPvMgP5aNx56mbRXcrZ0egsMYG2SzwF--NAXsTJG3J6sCIlufv_A78W-U2um9M/exec";

const QR_QRcode_reader_scanner_text_check_text = /^[USAT]\d{2}-\d{5}$/;
let QR_QRcode_reader_camera_on_off = false ;
let QR_QRcode_reader_scanner = null ;
let QR_QRcode_reader_result_check_result = null ;

// 関数を作成 //
// 読み取り成功時 //
function QR_QRcode_reader_onScanSuccess(decodedText) {

    if (true === QR_QRcode_reader_scanner_text_check_text.test(decodedText)) {
        QR_QRcode_reader_result.textContent = "読み取り結果：" + decodedText;
    }
    else{
        QR_QRcode_reader_result.textContent = "読み取り結果：" + "Error：形式が異なります";
    }
    }

// ボタンの状態によりカメラ起動停止する //
function QR_QRcode_reader_Scanner_on_off(){
    QR_QRcode_reader_camera_on_off = !QR_QRcode_reader_camera_on_off
    if (QR_QRcode_reader_camera_on_off){
            QR_QRcode_reader_button.textContent = "読み取り停止　＊カメラ稼働中"
        QR_QRcode_reader_scanner = new Html5QrcodeScanner(
        "QR_QRcode_reader",
            {
                fps: 24,
                qrbox: 250,
                videoConstraints: {
                    facingMode: "environment"
                }
            }
        );
            QR_QRcode_reader_scanner.render(
                QR_QRcode_reader_onScanSuccess
            );
    }   
    
    else{
        QR_QRcode_reader_button.textContent = "読み取り開始　＊カメラ停止中";
            QR_QRcode_reader_last_id = null ;
            console.log(QR_QRcode_reader_last_id);

        if (QR_QRcode_reader_scanner !== null){
            QR_QRcode_reader_scanner.clear();
            QR_QRcode_reader_scanner = null;
        }

    }
};

// 以降 //
// カメラは停止中なので読み取り停止中と表示 //
QR_QRcode_reader_button.textContent = "読み取り開始　＊カメラ停止中" ;

QR_QRcode_reader_button.addEventListener("click" , 
    QR_QRcode_reader_Scanner_on_off
)