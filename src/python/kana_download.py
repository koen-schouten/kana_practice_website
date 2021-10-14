import requests
import json

audio_base_url = " https://laits.utexas.edu/japanese/joshu/kana/kana_audio/"
romaji_list = ["a","i","u","e","o","ka","ki","ku","ke","ko","kya","kyu","kyo","sa","shi","su","se","so","sha","shu","sho","ta","chi","tsu","te","to","cha","chu","cho","na","ni","nu","ne","no","nya","nyu","nyo","ha","hi","hu_fu","he","ho","hya","hyu","hyo","ma","mi","mu","me","mo","mya","myu","myo","ya","yu","yo","ra","ri","ru","re","ro","rya","ryu","ryo","wa", "wo_o","n","ga","gi","gu","ge","go","gya","gyu","gyo","za","ji","zu","ze","zo","ja","ju","jo","da","ji","zu","de","do","ja","ju","jo","ba","bi","bu","be","bo","bya","byu","byo","pa","pi","pu","pe","po","pya","pyu","pyo" ]
hiragana_list = ["あ","い","う","え","お","か","き","く","け","こ","きゃ","きゅ","きょ","さ","し","す","せ","そ","しゃ","しゅ","しょ","た","ち","つ","て","と","ちゃ","ちゅ","ちょ","な","に","ぬ","ね","の","にゃ","にゅ","にょ","は","ひ","ふ","へ","ほ","ひゃ","ひゅ","ひょ","ま","み","む","め","も","みゃ","みゅ","みょ","や","ゆ","よ","ら","り","る","れ","ろ","りゃ","りゅ","りょ","わ", "を","ん","が","ぎ","ぐ","げ","ご","ぎゃ","ぎゅ","ぎょ","ざ","じ","ず","ぜ","ぞ","じゃ","じゅ","じょ","だ","じ","ず","で","ど","じゃ","じゅ","じょ","ば","び","ぶ","べ","ぼ","びゃ","びゅ","びょ","ぱ","ぴ","ぷ","ぺ","ぽ","ぴゃ","ぴゅ","ぴょ"]
katakana_list = ["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","きゃ","キュ","キョ","サ","シ","ス","セ","ソ","シャ","シュ","ショ","タ","チ","ツ","テ","ト","チャ","チュ","チョ","ナ","ニ","ヌ","ネ","ノ","ニャ","ニュ","ニョ","ハ","ヒ","フ","ヘ","ホ","ヒャ","ヒュ","ヒョ","マ","ミ","ム","メ","モ","ミャ","ミュ","ミョ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","リャ","リュ","リョ","ワ", "ヲ","ン","ガ","ギ","グ","ゲ","ゴ","ギャ","ギュ","ギョ","ザ","ジ","ズ","ゼ","ゾ","ジャ","ジュ","ジョ","ダ","ジ","ズ","デ","ド","ジャ","ジュ","ジョ","バ","ビ","ブ","ベ","ボ","ビャ","ビュ","ビョ","パ","ピ","プ","ペ","ポ","ピャ","ピュ","ピョ"]


kana_dict = {}
json_file = "kanas.json"
audio_output_dir = "data/kana_sounds"
data_output_dir = "data"


def getAudio(kana):
    url = f'{audio_base_url}{kana}.mp3'
    r = requests.get(url)
    file_name = f'{audio_output_dir}/{kana}.mp3'

    if(r.status_code == 200):
        with open(file_name, 'wb') as out_file:
            out_file.write(r.content)
    return file_name

if __name__ == "__main__":  
    for (romaji, hiragana, katakana) in zip(romaji_list, hiragana_list, katakana_list):
        file_name = getAudio(romaji)
        kana_dict[romaji] = {"romaji": romaji, "audio" : file_name, "hiragana": hiragana, "katakana": katakana}


    with open(f'{data_output_dir}/{json_file}', 'w') as outfile:
        json.dump(obj = kana_dict, fp = outfile, indent=4)
    