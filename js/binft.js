var binft = function (r) {
    var isTransparent = true;
    function getRandomColor() {
        if(isTransparent){
            isTransparent = false;
            //此处修改字体颜色,最后的 0 和 1 不要改
            return "rgba(255,255,255,0)"
        }else{
            isTransparent = true;
            return "rgba(255,255,255,1)"
        }
    }
    function n(r) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
            var oneword = document.createElement("span");
            oneword.textContent = "(*^▽^*)"; // 此处是末尾字符,←,↵
            oneword.style.color = getRandomColor();
            n.appendChild(oneword);
        }
        return n
    }
    function i() {
        var t = wordList[c.skillI];
        c.step ? c.step-- : (
            c.prefixP < l.length ? (
                c.prefixP >= 0 && (c.text += l[c.prefixP]),
                c.prefixP++
            ) : (
                "forward" === c.direction ? (
                    c.skillP < t.length ? (
                        c.text += t[c.skillP],
                        c.skillP++
                    ) : (
                        c.delay ? c.delay-- : (
                            c.direction = "backward",
                            c.delay = showTotalWordDelayTime
                        )
                    )
                ) : (
                    c.skillP > 0 ? (
                        c.text = c.text.slice(0, -1),
                        c.skillP--
                    ) : (
                        // 在诗词完全消失后，随机选择下一个诗词
                        c.skillI = Math.floor(Math.random() * wordList.length),
                        c.direction = "forward"
                    )
                )
            ),
            c.step = refreshDelayTime
        );
        r.textContent = c.text;
        r.appendChild(n(c.prefixP < l.length ? Math.min(maxLength, maxLength + c.prefixP) : Math.min(maxLength, t.length - c.skillP)));
        setTimeout(i, d);
    }
    
    var l = "",
    //此处改成你自己的诗词
    wordList = [
            "世味酸咸谁自信，人生声利古难全。",
            "无论海角与天涯，大抵心安即是家。",
            "心似白云常自在，意如流水任东西。",
            "度尽劫波兄弟在，相逢一笑泯恩仇。",
            "天地有万古，此身不再得；人生只百年，此日最易过。",
            "山中莫道无供给，明月清风不用钱。",
            "须信百年俱是梦，天地阔，且徜徉。",
            "我醉欲眠卿且去，明朝有意抱琴来。",
            "一生大笑能几回，斗酒相逢须醉倒。",
            "春风满帆，何愁无岸。",
            "我与山灵相对笑，满头晴雪共难消。",
            "行路难，不在水，不在山，只在人情反覆间！",
            "从前种种，譬如昨日死；从后种种，譬如今日生。",
            "人情似纸张张薄，世事如棋局局新 。",
            "试玉要烧三日满，辨材须待七年期。",
            "看似寻常最奇崛，成如容易却艰辛。",
            "生年不满百，常怀千岁忧。",
            "长恨人心不如水，等闲平地起波澜。",
            "草萤有耀终非火，荷露虽团岂是珠。",
            "词源倒倾三峡水，笔阵独扫千人军。",
            "愿得此身长报国，何须生入玉门关。",
            "千秋万岁名，寂寞身后事。",
            "诗万首，酒千觞。几曾着眼看侯王？",
            "两脚踏翻尘世路，一肩担尽古今愁。",
            "寄意寒星荃不察，我以我血荐轩辕。",
            "闲来写就青山卖，不使人间造孽钱。",
            "千古风流今在此，万里功名莫放休。",
            "名不显时心不朽，再挑灯火看文章。",
            "东风知我欲山行，吹断檐角积雨声。",
            "尔曹身与名俱灭，不废江河万古流。",
            "草不谢荣于春风，木不怨落于秋天。",
            "惆怅东栏一株雪， 人生看得几清明。",
            "淡墨英英妙写真，一花一叶一精神。",
            "后来视今犹视昔，过眼百年如风灯。",
            "若言琴上有琴声，放在匣中何不鸣？若言声在指头上，何不于君指上听？",
            "惆怅东栏一株雪， 人生看得几清明。",
            "兰陵美酒郁金香，玉碗盛来琥珀光。",
            "是身如聚沫，如烛亦如风。",
            "相逢不可欺，偶然如飘蓬。",
            "于道各努力，千里自同风。",
            "才见岭头云似盖，已惊岩下雪如尘。",
            "人间万事消磨尽，只有清香似旧时。",
            "日暮酒醒人已远，满天风雨下西楼。",
            "迷惑失故路，薄暮无宿栖。",
            "不见白头相携老，只许与君共天明。",
            "晓迎秋露一枝新，不占园中最上春。",
            "荷尽已无擎雨盖，菊残犹有傲霜枝。",
            "春未绿，鬓先丝。人间别久不成悲。",
            "人生自是有情痴，此恨不关风与月。",
            "莫道谗言如浪深，莫言迁客似沙沉。",
            "纵然一夜风吹去，只在芦花浅水边。",
            "万里桥西一草堂，百花潭水即沧浪。",
            "借问梅花何处落，风吹一夜满关山。",
            "东边日出西边雨，道是无晴却有晴。",
            "青山尚且直如弦，人生孤立何伤焉？",
            "何时杖尔看南雪，我与梅花两白头。",
            "千万恨，恨极在天涯。山月不知心里事，水风空落眼前花，摇曳碧云斜。",
            "天意怜幽草，人间重晚晴。",
            "五更缥缈千山月，万里凄凉一笛风。",


            "两人对酌山花开，一杯一杯复一杯。",
            "我醉欲眠卿且去，明朝有意抱琴来。",
                
            "一声梧叶一声秋，一点芭蕉一点愁，三更归梦三更后。",
            "落灯花，棋未收，叹新丰逆旅淹留。",
            "枕上十年事，江南二老忧，都到心头。",
            
            //《绝句·书当快意读易尽》陈师道
            "书当快意读易尽，客有可人期不来。",
            "世事相违每如此，好怀百岁几回开？",

            "南湖秋水夜无烟，耐可乘流直上天。",
            "且就洞庭赊月色，将船买酒白云边。",

            "蜗牛角上争何事，石火光中寄此身。",
            "随富随贫且欢乐，不开口笑是痴人。",

            "参横斗转欲三更，苦雨终风也解晴。",
            "云散月明谁点缀？天容海色本澄清。",
            "空余鲁叟乘桴意，粗识轩辕奏乐声。",
            "九死南荒吾不恨，兹游奇绝冠平生。",

            "世事短如春梦，人情薄似秋云。不须计较苦劳心，万事原来有命。",
            "幸遇三杯酒好，况逢一朵花新。片时欢笑且相亲，明日阴晴未定。",

        
        ].map(function (r) {
    return r + ""
    }),
    showTotalWordDelayTime = 5,
    refreshDelayTime = 2,
    maxLength = 1,
    d = 75,
    c = {
        text: "",
        prefixP: -maxLength,
        skillI: Math.floor(Math.random() * wordList.length), // 初始化时随机选择一个诗词
        skillP: 0,
        direction: "forward",
        delay: showTotalWordDelayTime,
        step: refreshDelayTime
    };
    i()
};
binft(document.getElementById('binft'));

//网站动态标题开始 
var OriginTitile = document.title,
titleTime;
document.addEventListener("visibilitychange",
function() {
    if (document.hidden) {
        document.title = "等你回来 Σ(っ °Д °;)っ";
        clearTimeout(titleTime)
    } else {
        document.title = "(/≧▽≦/)你又回来啦！ " ;
        titleTime = setTimeout(function() {
            document.title = OriginTitile
        },
        2000)
    }
});
//网站动态标题结束



