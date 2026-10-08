import type { Subject } from '../types'

export const coursesData: Subject[] = [
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
              { id: 'chinese-3a-u1-l1', title: '大青树下的小学', knowledgePoints: ['生字词', '课文朗读', '理解课文内容'], videoUrl: '' },
              { id: 'chinese-3a-u1-l2', title: '花的学校', knowledgePoints: ['生字词', '想象力培养', '拟人手法'], videoUrl: '' },
              { id: 'chinese-3a-u1-l3', title: '不懂就要问', knowledgePoints: ['阅读理解', '人物品质', '提问技巧'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3a-u2',
            title: '第二单元：金秋时节',
            lessons: [
              { id: 'chinese-3a-u2-l1', title: '古诗三首', knowledgePoints: ['古诗背诵', '诗意理解', '诗人情感'], videoUrl: '' },
              { id: 'chinese-3a-u2-l2', title: '铺满金色巴掌的水泥道', knowledgePoints: ['比喻修辞', '观察描写', '词语积累'], videoUrl: '' },
              { id: 'chinese-3a-u2-l3', title: '秋天的雨', knowledgePoints: ['拟人手法', '颜色词语', '段落结构'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3a-u3',
            title: '第三单元：童话世界',
            lessons: [
              { id: 'chinese-3a-u3-l1', title: '卖火柴的小女孩', knowledgePoints: ['童话故事', '人物情感', '对比手法'], videoUrl: '' },
              { id: 'chinese-3a-u3-l2', title: '那一定会很好', knowledgePoints: ['想象能力', '生命教育', '故事情节'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3a-u4',
            title: '第四单元：预测策略',
            lessons: [
              { id: 'chinese-3a-u4-l1', title: '总也倒不了的老屋', knowledgePoints: ['预测阅读', '情节推理', '人物分析'], videoUrl: '' },
              { id: 'chinese-3a-u4-l2', title: '胡萝卜先生的长胡子', knowledgePoints: ['续编故事', '想象力', '逻辑思维'], videoUrl: '' },
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
            title: '第一单元：可爱生灵',
            lessons: [
              { id: 'chinese-3b-u1-l1', title: '古诗三首', knowledgePoints: ['古诗理解', '春天景物', '诗人情感'], videoUrl: '' },
              { id: 'chinese-3b-u1-l2', title: '燕子', knowledgePoints: ['外形描写', '动作描写', '观察顺序'], videoUrl: '' },
              { id: 'chinese-3b-u1-l3', title: '荷花', knowledgePoints: ['景物描写', '想象联想', '优美语句'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3b-u2',
            title: '第二单元：寓言故事',
            lessons: [
              { id: 'chinese-3b-u2-l1', title: '守株待兔', knowledgePoints: ['寓言寓意', '文言文阅读', '道理理解'], videoUrl: '' },
              { id: 'chinese-3b-u2-l2', title: '陶罐和铁罐', knowledgePoints: ['人物对话', '性格分析', '谦虚美德'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3b-u3',
            title: '第三单元：传统文化',
            lessons: [
              { id: 'chinese-3b-u3-l1', title: '古诗三首', knowledgePoints: ['传统节日', '文化习俗', '古诗背诵'], videoUrl: '' },
              { id: 'chinese-3b-u3-l2', title: '纸的发明', knowledgePoints: ['说明文阅读', '历史知识', '信息提取'], videoUrl: '' },
            ],
          },
          {
            id: 'chinese-3b-u4',
            title: '第四单元：观察发现',
            lessons: [
              { id: 'chinese-3b-u4-l1', title: '花钟', knowledgePoints: ['时间顺序', '拟人手法', '观察记录'], videoUrl: '' },
              { id: 'chinese-3b-u4-l2', title: '蜜蜂', knowledgePoints: ['实验过程', '科学精神', '严谨态度'], videoUrl: '' },
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
              { id: 'math-3a-u1-l1', title: '秒的认识', knowledgePoints: ['认识时间单位', '时分秒的换算', '计算经过时间'], videoUrl: '' },
              { id: 'math-3a-u1-l2', title: '时间的计算', knowledgePoints: ['时间加减法', '经过时间计算', '时间单位换算'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3a-u2',
            title: '第二单元：万以内的加法和减法',
            lessons: [
              { id: 'math-3a-u2-l1', title: '两位数加两位数', knowledgePoints: ['口算方法', '进位加法', '估算'], videoUrl: '' },
              { id: 'math-3a-u2-l2', title: '三位数加三位数', knowledgePoints: ['竖式计算', '连续进位', '验算方法'], videoUrl: '' },
              { id: 'math-3a-u2-l3', title: '三位数减三位数', knowledgePoints: ['退位减法', '连续退位', '验算'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3a-u3',
            title: '第三单元：测量',
            lessons: [
              { id: 'math-3a-u3-l1', title: '毫米、分米的认识', knowledgePoints: ['长度单位', '单位换算', '实际测量'], videoUrl: '' },
              { id: 'math-3a-u3-l2', title: '千米的认识', knowledgePoints: ['较大长度单位', '千米与米换算', '路程计算'], videoUrl: '' },
              { id: 'math-3a-u3-l3', title: '吨的认识', knowledgePoints: ['质量单位', '吨与千克换算', '实际应用'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3a-u4',
            title: '第四单元：倍的认识',
            lessons: [
              { id: 'math-3a-u4-l1', title: '倍的认识', knowledgePoints: ['倍的概念', '求一个数的几倍', '倍数关系'], videoUrl: '' },
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
            title: '第一单元：位置与方向',
            lessons: [
              { id: 'math-3b-u1-l1', title: '认识东南西北', knowledgePoints: ['方向辨认', '地图阅读', '位置描述'], videoUrl: '' },
              { id: 'math-3b-u1-l2', title: '认识东北、东南、西北、西南', knowledgePoints: ['八个方向', '方向组合', '路线描述'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3b-u2',
            title: '第二单元：除数是一位数的除法',
            lessons: [
              { id: 'math-3b-u2-l1', title: '口算除法', knowledgePoints: ['整十整百除以一位数', '口算技巧', '估算'], videoUrl: '' },
              { id: 'math-3b-u2-l2', title: '笔算除法（两位数除以一位数）', knowledgePoints: ['竖式计算', '试商方法', '验算'], videoUrl: '' },
              { id: 'math-3b-u2-l3', title: '笔算除法（三位数除以一位数）', knowledgePoints: ['商中间有0', '商末尾有0', '有余数除法'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3b-u3',
            title: '第三单元：复式统计表',
            lessons: [
              { id: 'math-3b-u3-l1', title: '复式统计表', knowledgePoints: ['数据收集', '统计表制作', '数据分析'], videoUrl: '' },
            ],
          },
          {
            id: 'math-3b-u4',
            title: '第四单元：两位数乘两位数',
            lessons: [
              { id: 'math-3b-u4-l1', title: '口算乘法', knowledgePoints: ['整十数乘整十数', '口算技巧', '积的变化规律'], videoUrl: '' },
              { id: 'math-3b-u4-l2', title: '笔算乘法', knowledgePoints: ['竖式计算', '进位乘法', '解决问题'], videoUrl: '' },
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
    color: '#45B7D1',
    semesters: [
      {
        id: 'english-3a',
        title: '三年级上册',
        units: [
          {
            id: 'english-3a-u1',
            title: 'Unit 1: Hello!',
            lessons: [
              { id: 'english-3a-u1-l1', title: 'Greetings 打招呼', knowledgePoints: ['Hello/Hi', 'Good morning/afternoon', '自我介绍'], videoUrl: '' },
              { id: 'english-3a-u1-l2', title: 'Names 名字', knowledgePoints: ["What's your name?", "I'm...", 'My name is...'], videoUrl: '' },
            ],
          },
          {
            id: 'english-3a-u2',
            title: 'Unit 2: Colours',
            lessons: [
              { id: 'english-3a-u2-l1', title: 'Colours 颜色', knowledgePoints: ['red/yellow/blue/green', 'What colour is it?', "It's..."], videoUrl: '' },
              { id: 'english-3a-u2-l2', title: 'Things and colours', knowledgePoints: ['物品颜色描述', 'I see...', 'Show me...'], videoUrl: '' },
            ],
          },
          {
            id: 'english-3a-u3',
            title: 'Unit 3: Look at me!',
            lessons: [
              { id: 'english-3a-u3-l1', title: 'Body parts 身体部位', knowledgePoints: ['head/face/nose/mouth', 'This is my...', 'Touch your...'], videoUrl: '' },
              { id: 'english-3a-u3-l2', title: 'Actions 动作', knowledgePoints: ['Clap your hands', 'Wave your arms', '动作指令'], videoUrl: '' },
            ],
          },
          {
            id: 'english-3a-u4',
            title: 'Unit 4: We love animals',
            lessons: [
              { id: 'english-3a-u4-l1', title: 'Animals 动物', knowledgePoints: ['cat/dog/duck/pig', "What's this?", "It's a..."], videoUrl: '' },
              { id: 'english-3a-u4-l2', title: 'Animal sounds', knowledgePoints: ['动物叫声', 'Act like a...', 'I like...'], videoUrl: '' },
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
              { id: 'english-3b-u1-l1', title: 'Welcome back', knowledgePoints: ['Welcome back!', 'Nice to see you again', 'Where are you from?'], videoUrl: '' },
              { id: 'english-3b-u1-l2', title: 'Countries', knowledgePoints: ["I'm from...", 'China/USA/UK/Canada', '国家名称'], videoUrl: '' },
            ],
          },
          {
            id: 'english-3b-u2',
            title: 'Unit 2: My family',
            lessons: [
              { id: 'english-3b-u2-l1', title: 'Family members', knowledgePoints: ['father/mother/brother/sister', "Who's that man/woman?", "He's/She's..."], videoUrl: '' },
              { id: 'english-3b-u2-l2', title: 'Family tree', knowledgePoints: ['grandfather/grandmother', 'This is my family', 'I love my family'], videoUrl: '' },
            ],
          },
          {
            id: 'english-3b-u3',
            title: 'Unit 3: At the zoo',
            lessons: [
              { id: 'english-3b-u3-l1', title: 'Zoo animals', knowledgePoints: ['elephant/monkey/tiger/panda', "What's that?", "It's a..."], videoUrl: '' },
              { id: 'english-3b-u3-l2', title: 'Describing animals', knowledgePoints: ['tall/short/fat/thin', 'Look at that...', "It's so..."], videoUrl: '' },
            ],
          },
          {
            id: 'english-3b-u4',
            title: 'Unit 4: Where is my car?',
            lessons: [
              { id: 'english-3b-u4-l1', title: 'Location 位置', knowledgePoints: ['in/on/under', 'Where is...?', "It's in/on/under..."], videoUrl: '' },
              { id: 'english-3b-u4-l2', title: 'Toys and things', knowledgePoints: ['car/ball/doll/kite', 'Is it in your bag?', 'Yes, it is./No, it isn\'t.'], videoUrl: '' },
            ],
          },
        ],
      },
    ],
  },
]
