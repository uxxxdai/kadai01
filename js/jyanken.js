//グローバル変数定義
var chara_a = 0
var chara_b = 0
var player_hand = 0;
var cpu_hand = 0;
var maxhp_a = 100; // aの最大H/P
var nowhp_a = maxhp_a;
var maxhp_b = 100; // bの最大H/P
var nowhp_b = maxhp_b;
var damage = 0;
var chara_a = 0 
var chara_b = 1 
const charaname_a = ["ピカチュウ","ロコン(アローラ）","イーブイ","ポニータ（ガラル）","コリンク"]
const charaname_b = ["ピカチュウ","ロコン（アローラ）","イーブイ","ポニータ（ガラル）","コリンク"]
const chara_imgs = ["Pikachu.png","alora-rokon.png","i-vy.png","garaluponi-ta.png","korinku.png"]

// 最初からもう一回！ボタン
$(".btn").on("click", function restart() {
    player_hand = 0;
    cpu_hand = 0;
    maxhp_a = 100; 
    nowhp_a = maxhp_a;
    maxhp_b = 100; // bの最大H/P
    nowhp_b = maxhp_b;
    damage = 0;
    $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
    $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
    $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
    $(".message_contents").html("グー、チョキ、パーのどれかをえらんでね。かった方がこうげき！<br>（※こうげきりょくはグー：20、チョキ：30、パー：40で、<br>あたえるダメージはヒットのしかたによってかわるよ！）");
})

// キャラ替えて再開ボタン
    $(".btn2").on("click", function change_restart() {
        chara_a = $(".pulldown").val();
        const random = Math.floor(Math.random() * 5)
        chara_b = random; //相手はでランダムで決まる
        player_hand = 0;
        cpu_hand = 0;
        maxhp_a = 100; 
        nowhp_a = maxhp_a;
        maxhp_b = 100; // bの最大H/P
        nowhp_b = maxhp_b;
        damage = 0;
        $(".name.chara_a").text(charaname_a[chara_a]);
        $(".name.chara_b").text(charaname_b[chara_b]);
        $(".battle_character.chara_a img").attr("src","images/"+ chara_imgs[chara_a]);
        $(".battle_character.chara_b img").attr("src","images/"+ chara_imgs[chara_b]);
        $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
        $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
        $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
        $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
        $(".message_contents").html("グー、チョキ、パーのどれかを選んでね。勝った方がこうげき！<br>（※こうげきりょくはグー：20、チョキ：30、パー：40で、<br>あたえるダメージはヒットのつよさによってかわるよ！）");
    })

// じゃんけんボタン押したとき
    $(".option_box").on("click", function attack() {
        const imgs = ["gu-300x300.png", "choki-300x300.png", "pa-300x300.png"];
        if(nowhp_a <= 0||nowhp_b <= 0){
            alert("「さいしょからもう一回！」を押してね");
        }else{
            $(".message_contents").text("じゃーんけーん");
        setTimeout(() => {
            $(".message_contents").text("ぽん！！！");
            player_hand = $(this).val();
            cpu_hand = Math.floor(Math.random()*3);
            $(".battle_hand.chara_a img").attr("src","images/"+ imgs[player_hand]);
            $(".battle_hand.chara_b img").attr("src","images/"+ imgs[cpu_hand]);
        
            // 勝ち負け判定
            setTimeout(() => {
                if (player_hand == cpu_hand){
                    $(".message_contents").text("あいこ！じゃんけんをもう一度えらんでね。");}
                else if(player_hand==0&&cpu_hand==1||player_hand==1&&cpu_hand==2||player_hand==2&&cpu_hand==0){
                    $(".message_contents").text("じゃんけんにかった！" + charaname_a[chara_a] + "のこうげき！");
                    setTimeout(() => {
                            // ダメージポイント計算とゲージの減少
                            const random = Math.floor(Math.random() * 11);
                            damage = Math.floor((1-(random-5)/100*6)* (Number(player_hand)+2)*10);
                            // console.log(random);
                            // console.log(player_hand);
                            // console.log(damage);
                            // console.log(nowhp_a);
                            nowhp_b = nowhp_b - damage;
                            // console.log(damage);
                            // console.log(nowhp_b);
                            if (nowhp_b > 0) {
                                if (random == 0) {
                                    $(".message_contents").text("こうげきをかわされた。");
                                }else if (random > 0 && random <=3){
                                    $(".message_contents").text("クリティカルヒット！" + charaname_b[chara_b] + "に[ " + damage + " ]のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
                                }else if(random > 3 && random <=7){
                                    $(".message_contents").text("まぁまぁのあたりだ！" + charaname_b[chara_b] + "に[ " + damage + " ]のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
                                }else if(random >= 7 && random <=10){
                                    $(".message_contents").text("よわいあたりだ！" + charaname_b[chara_b] + "に[ " + damage + " ]のダメージを与えた");
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
                                }
                                }else {
                                    $(".message_contents").text(charaname_b[chara_b] + "に[ " + damage + " ]のダメージを与えた");
                                setTimeout(() => {
                                    $(".message_contents").html(charaname_b[chara_b] + "はちからつきた。<br>" + charaname_a[chara_a] + "のかち！<br>ゲームおしまい。”さいしょからもう一回！”を押してね。");
                                    $(".hp_now.chara_b").text("0/" + maxhp_b);
                                    $(".hp_now.chara_b").width("0" + "px");
                                },1000);
                        }
                    }, 1000);
                    }
                else{$(".message_contents").text("じゃんけんに負けた！" + charaname_b[chara_b] + "のこうげき！");
                    setTimeout(() => {
                        const random = Math.floor(Math.random() * 11);
                        damage = Math.floor((1-(random-5)/100*6)* (Number(cpu_hand)+2)*10);
                        // console.log(random);
                        // console.log(cpu_hand);
                        // console.log(damage);
                        nowhp_a = nowhp_a - damage;
                        // console.log(damage);
                        // console.log(nowhp_a);
                        if (nowhp_a > 0) {
                            if (random == 0) {
                                $(".message_contents").text("こうげきをかわした。");
                            }else if(random > 0 && random <=3){
                                $(".message_contents").text("クリティカルヒット！" + charaname_a[chara_a] + "は[ " + damage + " ]のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
                            }else if(random > 3 && random <=7){
                                $(".message_contents").text("まぁまぁのあたりだ！" + charaname_a[chara_a] + "は[ " + damage + " ]のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
                            }else if(random > 7 && random <=10){
                                $(".message_contents").text("よわいあたりだ！" + charaname_a[chara_a] + "は[ " + damage + " ]のダメージを受けた");
                                $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                                $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
                            }
                        }else {
                            $(".message_contents").text( charaname_a[chara_a] + "は[ " + damage + " ]のダメージを受けた");
                        setTimeout(() => {
                            $(".message_contents").html(charaname_a[chara_a] + "はちからつきた。<br>" + charaname_b[chara_b] + "のかち！<br>ゲームおしまい。”さいしょからもう一回！”を押してね。");
                            $(".hp_now.chara_a").text("0/" + maxhp_a);
                            $(".hp_now.chara_a").width("0" + "px");
                        },1000);
                    }
                         
                    }, 1000);  
                }   
            }, 1000);
        }, 1000);
    }
    })
