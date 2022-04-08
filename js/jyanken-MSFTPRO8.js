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


// 最初に代入と初期化
    $(".btn").on("click", function restart() {
        chara_a = 1 //あとで取ってくる設定に
        chara_b = 2 //あとで取ってくる設定に
        const charaname_a = ["ピカチュウ","アローラロコン","イーブイ","ガラルポニータ","コリンク"]
        const charaname_b = ["ピカチュウ","アローラロコン","イーブイ","ガラルポニータ","コリンク"]
        const chara_imgs = ["Pikachu.png","alora-rokon.png","i-vy.png","garaluponi-ta.png","korinku.png"]
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
        $(".message_contents").html("グー、チョキ、パーのどれかを選んでね。勝った方がこうげき！<br>（※こうげきりょくはグー：20、チョキ：30、パー：40で、<br>あたえるダメージはヒットのしかたによってかわるよ！）");
    })

// じゃんけんボタン押したとき動作
    $(".option_box").on("click", function attack() {
        const imgs = ["gu-300x300.png", "choki-300x300.png", "pa-300x300.png"];
        if(nowhp_a <= 0||nowhp_b <= 0){
            alert("「最初に戻る」を押してね");
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
                    $(".message_contents").text("あいこ！じゃんけんをもう一度選んでね。");}
                else if(player_hand==0&&cpu_hand==1||player_hand==1&&cpu_hand==2||player_hand==2&&cpu_hand==0){
                    $(".message_contents").text("じゃんけんに勝った！こちらのこうげき！");
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
                                }else if(random >= 1 && random <=2){
                                    $(".message_contents").text("クリティカルヒット！相手に[ " + damage + " ]のダメージを与えた");
                                }else if(random >= 3 && random <=7){
                                    $(".message_contents").text("普通のあたりだ！相手に[ " + damage + " ]のダメージを与えた");
                                }else if(random >= 8 && random <=10){
                                    $(".message_contents").text("弱いあたりだ！相手に[ " + damage + " ]のダメージを与えた");
                                }
                                    $(".hp_now.chara_b").text(nowhp_b + "/" + maxhp_b);
                                    $(".hp_now.chara_b").width(400 / maxhp_b * nowhp_b + "px");
                            } else {
                                $(".message_contents").text("相手に[ " + damage + " ]のダメージを与えた");
                            setTimeout(() => {
                                $(".message_contents").html("相手は力尽きた。ゲーム終了。<br>”最初に戻る”を押してね。");
                                $(".hp_now.chara_b").text("0/" + maxhp_b);
                                $(".hp_now.chara_b").width("0" + "px");
                            },1000);
                        }
                    }, 1000);
                    }
                else{$(".message_contents").text("じゃんけんに負けた！相手のこうげき！");
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
                                $(".message_contents").text("クリティカルヒット！あなたは[ " + damage + " ]のダメージを受けた");
                            }else if(random > 3 && random <=7){
                                $(".message_contents").text("普通のあたりだ！あなたは[ " + damage + " ]のダメージを受けた");
                            }else if(random > 7 && random <=10){
                                $(".message_contents").text("弱いあたりだ！あなたは[ " + damage + " ]のダメージを受けた");
                            }
                            $(".hp_now.chara_a").text(nowhp_a + "/" + maxhp_a);
                            $(".hp_now.chara_a").width(400 / maxhp_a * nowhp_a + "px");
                        }else {
                            $(".message_contents").text("あなたは[ " + damage + " ]のダメージを受けた");
                        setTimeout(() => {
                            $(".message_contents").html("あなたは力尽きた。ゲーム終了。<br>”最初に戻る”を押してね。");
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

// 最初に戻るを押したとき（初期化)