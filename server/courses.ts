// 课程数据：小学三年级语文、数学、英语
// 按学期 -> 单元 -> 课时分层，每课时绑定知识点和外部网课链接

export interface Lesson {
  id: string;
  title: string;
  knowledgePoints: string[];
  videoUrl: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Semester {
  id: string;
  title: string;
  units: Unit[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  semesters: Semester[];
}

export const courses: Subject[] = [
  {
    id: 'chinese',
    name: '语文',
    icon: '📖',
    color: '#FF6B6B',
    semesters: [
      {
        id: 'chinese-3a',
        title: '三年级上册',
        units: [
          {
            id: 'chinese-3a-u1',
            title: '第一单元：学校生活',
            lessons: [
              {
                id: 'chinese-3a-u1-l1',
                title: '大青树下的小学',
                knowledgePoints: ['生字词：晨、绒、球', '有感情地朗读课文', '理解民族团结'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3a-u1-l2',
                title: '花的学校',
                knowledgePoints: ['生字词：荒、笛、舞', '拟人手法', '想象画面'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3a-u1-l3',
                title: '不懂就要问',
                knowledgePoints: ['略读课文方法', '孙中山的故事', '勤学好问的品质'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'chinese-3a-u2',
            title: '第二单元：金秋时节',
            lessons: [
              {
                id: 'chinese-3a-u2-l1',
                title: '古诗三首',
                knowledgePoints: ['《山行》《赠刘景文》《夜书所见》', '理解诗意', '背诵古诗'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3a-u2-l2',
                title: '铺满金色巴掌的水泥道',
                knowledgePoints: ['比喻手法', '观察秋天', '优美词句积累'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3a-u2-l3',
                title: '秋天的雨',
                knowledgePoints: ['总分结构', '颜色描写', '拟人句'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
      {
        id: 'chinese-3b',
        title: '三年级下册',
        units: [
          {
            id: 'chinese-3b-u1',
            title: '第一单元：可爱的生灵',
            lessons: [
              {
                id: 'chinese-3b-u1-l1',
                title: '古诗三首',
                knowledgePoints: ['《绝句》《惠崇春江晚景》《三衢道中》', '想象画面', '背诵默写'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3b-u1-l2',
                title: '燕子',
                knowledgePoints: ['外形描写', '动态描写', '比喻手法'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3b-u1-l3',
                title: '荷花',
                knowledgePoints: ['观察顺序', '想象画面', '优美语句'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'chinese-3b-u2',
            title: '第二单元：寓言故事',
            lessons: [
              {
                id: 'chinese-3b-u2-l1',
                title: '守株待兔',
                knowledgePoints: ['文言文阅读', '寓意理解', '成语积累'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3b-u2-l2',
                title: '陶罐和铁罐',
                knowledgePoints: ['人物对话', '性格分析', '谦虚与骄傲'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'chinese-3b-u2-l3',
                title: '鹿角和鹿腿',
                knowledgePoints: ['故事道理', '心理描写', '事物价值'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    name: '数学',
    icon: '🔢',
    color: '#4ECDC4',
    semesters: [
      {
        id: 'math-3a',
        title: '三年级上册',
        units: [
          {
            id: 'math-3a-u1',
            title: '第一单元：时、分、秒',
            lessons: [
              {
                id: 'math-3a-u1-l1',
                title: '秒的认识',
                knowledgePoints: ['秒针走动', '1分=60秒', '时间感知'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3a-u1-l2',
                title: '时间的计算',
                knowledgePoints: ['时间换算', '经过时间计算', '时间单位'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'math-3a-u2',
            title: '第二单元：万以内的加法和减法（一）',
            lessons: [
              {
                id: 'math-3a-u2-l1',
                title: '两位数加两位数',
                knowledgePoints: ['口算方法', '进位加法', '估算'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3a-u2-l2',
                title: '两位数减两位数',
                knowledgePoints: ['口算方法', '退位减法', '估算'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3a-u2-l3',
                title: '几百几十加减几百几十',
                knowledgePoints: ['竖式计算', '进位退位', '验算'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'math-3a-u3',
            title: '第三单元：测量',
            lessons: [
              {
                id: 'math-3a-u3-l1',
                title: '毫米、分米的认识',
                knowledgePoints: ['长度单位', '单位换算', '实际测量'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3a-u3-l2',
                title: '千米的认识',
                knowledgePoints: ['千米概念', '千米与米换算', '估测距离'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
      {
        id: 'math-3b',
        title: '三年级下册',
        units: [
          {
            id: 'math-3b-u1',
            title: '第一单元：位置与方向（一）',
            lessons: [
              {
                id: 'math-3b-u1-l1',
                title: '认识东南西北',
                knowledgePoints: ['方向辨认', '地图方向', '实际应用'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3b-u1-l2',
                title: '认识东北、东南、西北、西南',
                knowledgePoints: ['八个方向', '方向描述', '路线图'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'math-3b-u2',
            title: '第二单元：除数是一位数的除法',
            lessons: [
              {
                id: 'math-3b-u2-l1',
                title: '口算除法',
                knowledgePoints: ['整十整百除以一位数', '口算技巧', '估算'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3b-u2-l2',
                title: '笔算除法（两位数除以一位数）',
                knowledgePoints: ['竖式计算', '试商', '验算'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'math-3b-u2-l3',
                title: '笔算除法（三位数除以一位数）',
                knowledgePoints: ['竖式计算', '商中间有0', '商末尾有0'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'math-3b-u3',
            title: '第三单元：复式统计表',
            lessons: [
              {
                id: 'math-3b-u3-l1',
                title: '复式统计表',
                knowledgePoints: ['数据收集', '统计表制作', '数据分析'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: '英语',
    icon: '🔤',
    color: '#FFE66D',
    semesters: [
      {
        id: 'english-3a',
        title: '三年级上册',
        units: [
          {
            id: 'english-3a-u1',
            title: 'Unit 1: Hello!',
            lessons: [
              {
                id: 'english-3a-u1-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['打招呼用语：Hello/Hi', '自我介绍：I\'m...', '字母Aa-Dd'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3a-u1-l2',
                title: "Let's play & Let's chant",
                knowledgePoints: ['游戏互动用语', '字母发音', '歌曲韵律'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'english-3a-u2',
            title: 'Unit 2: Colours',
            lessons: [
              {
                id: 'english-3a-u2-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['颜色单词：red/yellow/blue', '句型：What colour is it?', '字母Ee-Hh'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3a-u2-l2',
                title: "Let's do & Let's sing",
                knowledgePoints: ['指令动作', '颜色歌曲', '字母书写'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'english-3a-u3',
            title: 'Unit 3: Look at me!',
            lessons: [
              {
                id: 'english-3a-u3-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['身体部位：face/eye/nose', '句型：Look at me!', '字母Ii-Ll'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3a-u3-l2',
                title: "Let's play & Let's make",
                knowledgePoints: ['拼图游戏', '手工制作', '口语表达'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
      {
        id: 'english-3b',
        title: '三年级下册',
        units: [
          {
            id: 'english-3b-u1',
            title: 'Unit 1: Welcome back to school!',
            lessons: [
              {
                id: 'english-3b-u1-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['欢迎用语：Welcome back', '国家：China/USA/UK', '字母Aa-Ee复习'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3b-u1-l2',
                title: "Let's chant & Let's spell",
                knowledgePoints: ['发音练习', '拼读规则', '歌曲'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'english-3b-u2',
            title: 'Unit 2: My family',
            lessons: [
              {
                id: 'english-3b-u2-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['家庭成员：father/mother/brother', '句型：Who\'s that...?', '字母Ff-Ii'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3b-u2-l2',
                title: "Let's play & Let's chant",
                knowledgePoints: ['家庭树', '角色扮演', '语音练习'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
          {
            id: 'english-3b-u3',
            title: 'Unit 3: At the zoo',
            lessons: [
              {
                id: 'english-3b-u3-l1',
                title: "Let's talk & Let's learn",
                knowledgePoints: ['动物：giraffe/elephant/monkey', '形容词：tall/short/big', '字母Jj-Mm'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
              {
                id: 'english-3b-u3-l2',
                title: "Let's do & Let's spell",
                knowledgePoints: ['动物动作', '描述特征', '拼读练习'],
                videoUrl: 'https://basic.smartedu.cn/',
              },
            ],
          },
        ],
      },
    ],
  },
];
