import type { Question } from '../types'

// 内置题库 - 按科目和知识点分类
const questionBank: Record<string, Question[]> = {
  math: [
    { type: 'single_choice', question: '3 × 7 = ?', options: ['18', '21', '24', '28'], answer: '21', explanation: '3乘7表示3个7相加：7+7+7=21。乘法口诀"三七二十一"。' },
    { type: 'single_choice', question: '56 + 38 = ?', options: ['84', '94', '92', '96'], answer: '94', explanation: '先算50+30=80，再算6+8=14，最后80+14=94。' },
    { type: 'true_false', question: '1米 = 100厘米', options: ['正确', '错误'], answer: '正确', explanation: '米和厘米的换算关系是：1米=100厘米。' },
    { type: 'fill_blank', question: '58 + 37 = ___', options: [], answer: '95', explanation: '先算50+30=80，再算8+7=15，最后80+15=95。' },
    { type: 'single_choice', question: '下面哪个数最大？', options: ['456', '465', '546', '564'], answer: '564', explanation: '比较三位数大小时，先比百位，再比十位，最后比个位。' },
    { type: 'true_false', question: '正方形有四条边，四条边都相等。', options: ['正确', '错误'], answer: '正确', explanation: '正方形的定义就是四条边都相等、四个角都是直角的四边形。' },
    { type: 'fill_blank', question: '72 ÷ 8 = ___', options: [], answer: '9', explanation: '乘法口诀"八九七十二"，所以72÷8=9。' },
    { type: 'single_choice', question: '1小时 = ? 分钟', options: ['50', '60', '100', '120'], answer: '60', explanation: '时间单位换算：1小时=60分钟。' },
    { type: 'single_choice', question: '250 + 350 = ?', options: ['500', '600', '550', '650'], answer: '600', explanation: '250+350：先算200+300=500，再算50+50=100，最后500+100=600。' },
    { type: 'fill_blank', question: '4 × 6 = ___', options: [], answer: '24', explanation: '乘法口诀"四六二十四"。' },
    { type: 'true_false', question: '0除以任何数都得0。', options: ['正确', '错误'], answer: '错误', explanation: '0不能做除数，0除以任何非零数得0。' },
    { type: 'single_choice', question: '下面哪个是锐角？', options: ['90度', '180度', '45度', '120度'], answer: '45度', explanation: '锐角是小于90度的角。' },
    { type: 'fill_blank', question: '1000 - 456 = ___', options: [], answer: '544', explanation: '1000-456：把1000分成999+1，999-456=543，543+1=544。' },
    { type: 'single_choice', question: '一个苹果约重200？', options: ['克', '千克', '吨', '斤'], answer: '克', explanation: '一个苹果的重量大约200克。' },
    { type: 'true_false', question: '周长相等的两个长方形，面积也一定相等。', options: ['正确', '错误'], answer: '错误', explanation: '周长相等的长方形，长和宽可以不同，面积不一定相等。' },
  ],
  chinese: [
    { type: 'single_choice', question: '"大青树下的小学"描写了哪里的学校？', options: ['城市学校', '边疆小学', '乡村小学', '山区小学'], answer: '边疆小学', explanation: '课文描写了边疆一所小学里各民族孩子一起学习的场景。' },
    { type: 'single_choice', question: '下列哪个是比喻句？', options: ['他很高。', '他像长颈鹿一样高。', '他可能很高。', '他真的很高。'], answer: '他像长颈鹿一样高。', explanation: '比喻句要有本体、喻体和比喻词（像、好像、仿佛等）。' },
    { type: 'fill_blank', question: '"停车坐爱枫林晚，霜叶红于二月花"的作者是___。', options: [], answer: '杜牧', explanation: '这是唐代诗人杜牧《山行》中的名句。' },
    { type: 'true_false', question: '"守株待兔"告诉我们只要耐心等待就会有收获。', options: ['正确', '错误'], answer: '错误', explanation: '守株待兔告诉我们不能心存侥幸，要靠自己的努力。' },
    { type: 'single_choice', question: '下列词语中，书写正确的是？', options: ['兴高彩烈', '兴高采烈', '兴高彩烈', '兴高彩烈'], answer: '兴高采烈', explanation: '"兴高采烈"的"采"是"神采"的意思，不要写成"彩"。' },
    { type: 'fill_blank', question: '"人之初，性本善"出自___。', options: [], answer: '三字经', explanation: '这是《三字经》的开篇句。' },
    { type: 'single_choice', question: '"卖火柴的小女孩"的作者是？', options: ['格林兄弟', '安徒生', '伊索', '克雷洛夫'], answer: '安徒生', explanation: '《卖火柴的小女孩》是丹麦作家安徒生的童话作品。' },
    { type: 'true_false', question: '"陶罐和铁罐"中铁罐最后保存完好。', options: ['正确', '错误'], answer: '错误', explanation: '铁罐最后氧化消失了，陶罐保存完好。' },
    { type: 'fill_blank', question: '"千门万户曈曈日，总把新桃换旧符"描写的是___节。', options: [], answer: '春', explanation: '这是王安石《元日》中的诗句，描写的是春节。' },
    { type: 'single_choice', question: '下列哪个词语是描写秋天的？', options: ['春暖花开', '秋高气爽', '夏日炎炎', '寒冬腊月'], answer: '秋高气爽', explanation: '"秋高气爽"是形容秋天天空高远、气候凉爽的词语。' },
    { type: 'true_false', question: '"那一定会很好"告诉我们种子要不断追求变化。', options: ['正确', '错误'], answer: '正确', explanation: '课文通过种子的变化告诉我们要有积极的人生态度。' },
    { type: 'fill_blank', question: '"欲穷千里目，更上一层楼"的作者是___。', options: [], answer: '王之涣', explanation: '这是唐代诗人王之涣《登鹳雀楼》中的名句。' },
    { type: 'single_choice', question: '"花钟"一文中，不同的花开放的时间___。', options: ['相同', '不同', '有时相同', '不一定'], answer: '不同', explanation: '课文告诉我们不同的花开放时间是不同的。' },
    { type: 'true_false', question: '"蜜蜂"一课中法布尔通过实验证实了蜜蜂有辨认方向的能力。', options: ['正确', '错误'], answer: '正确', explanation: '法布尔通过实验证明蜜蜂确实有辨认方向的能力。' },
    { type: 'fill_blank', question: '"独在异乡为异客，每逢佳节倍思亲"的作者是___。', options: [], answer: '王维', explanation: '这是唐代诗人王维《九月九日忆山东兄弟》中的诗句。' },
  ],
  english: [
    { type: 'single_choice', question: '"Hello" 的中文意思是？', options: ['再见', '你好', '谢谢', '对不起'], answer: '你好', explanation: 'Hello 是最常用的英语打招呼用语。' },
    { type: 'single_choice', question: 'What colour is the apple? 应回答：', options: ["It's a red.", "It's red.", "It's an red.", "Red is it."], answer: "It's red.", explanation: '回答颜色用 "It\'s + 颜色" 的句型。' },
    { type: 'fill_blank', question: 'Good ___! (早上好)', options: [], answer: 'morning', explanation: 'Good morning 是早上好的意思。' },
    { type: 'true_false', question: '"I\'m from China" 意思是"我来自中国"。', options: ['正确', '错误'], answer: '正确', explanation: 'be from 表示"来自..."' },
    { type: 'single_choice', question: '"father" 对应的中文是？', options: ['母亲', '父亲', '兄弟', '姐妹'], answer: '父亲', explanation: 'father 是父亲的意思，mother 是母亲。' },
    { type: 'fill_blank', question: 'What\'s your name? My name ___ Amy.', options: [], answer: 'is', explanation: 'My name is... 是自我介绍的句型。' },
    { type: 'single_choice', question: '看到大象应该说：', options: ["It's a cat.", "It's an elephant.", "It's a dog.", "It's a pig."], answer: "It's an elephant.", explanation: 'elephant 是以元音音素开头的单词，前面用 an。' },
    { type: 'true_false', question: '"Where is my car?" 中的"where"是问地点的。', options: ['正确', '错误'], answer: '正确', explanation: 'where 是询问地点的特殊疑问词。' },
    { type: 'fill_blank', question: 'The book is ___ the desk. (在桌子上)', options: [], answer: 'on', explanation: 'on 表示"在...上面"，in 表示"在...里面"，under 表示"在...下面"。' },
    { type: 'single_choice', question: '"tall" 的反义词是？', options: ['big', 'small', 'short', 'long'], answer: 'short', explanation: 'tall 表示"高的"，short 表示"矮的/短的"。' },
    { type: 'true_false', question: '"Nice to meet you" 是初次见面时的问候语。', options: ['正确', '错误'], answer: '正确', explanation: 'Nice to meet you 是初次见面时常用的英语问候语。' },
    { type: 'fill_blank', question: 'I ___ from Beijing. (我来自北京)', options: [], answer: 'am', explanation: 'I am from... 表示"我来自..."，也可以缩写为 I\'m from...' },
    { type: 'single_choice', question: '"Clap your hands" 意思是？', options: ['挥挥手臂', '拍拍手', '跺跺脚', '点点头'], answer: '拍拍手', explanation: 'clap 是"拍"的意思，hands 是"手"。' },
    { type: 'true_false', question: '"panda" 是复数形式。', options: ['正确', '错误'], answer: '错误', explanation: 'panda 是单数，复数是 pandas。' },
    { type: 'fill_blank', question: 'How are you? I\'m ___, thank you.', options: [], answer: 'fine', explanation: 'How are you 的常用回答是 "I\'m fine, thank you." 或 "Fine, thanks."' },
  ],
}

// 根据科目和知识点筛选题目
function getQuestionsBySubject(subject: string, _knowledgePoints: string[], count: number): Question[] {
  const bank = questionBank[subject] || questionBank.math
  // 打乱数组
  const shuffled = [...bank].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// 生成变式题
function generateVariantQuestion(original: Question): Question {
  // 数学题的变式
  if (original.type === 'single_choice' && original.question.includes('×')) {
    const nums = [2, 3, 4, 5, 6, 7, 8, 9]
    const a = nums[Math.floor(Math.random() * nums.length)]
    const b = nums[Math.floor(Math.random() * nums.length)]
    const answer = a * b
    const wrong1 = answer + 2
    const wrong2 = answer - 2
    const wrong3 = answer + 4
    const options = [String(wrong1), String(answer), String(wrong2), String(wrong3)].sort(() => Math.random() - 0.5)
    return {
      type: 'single_choice',
      question: `${a} × ${b} = ?`,
      options,
      answer: String(answer),
      explanation: `${a}乘${b}表示${a}个${b}相加。乘法口诀要记住哦！`,
    }
  }
  // 默认返回原题
  return original
}

// 模拟AI生成题目
export function mockGenerateQuestions(subject: string, _lessonTitle: string, knowledgePoints: string[], count: number = 5): Promise<Question[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getQuestionsBySubject(subject, knowledgePoints, count))
    }, 1500)
  })
}

// 模拟AI批改
export function mockGradeQuestions(questions: Question[], answers: string[]): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = questions.map((q, i) => {
        const userAnswer = answers[i]?.trim() || ''
        let correct = false
        
        if (q.type === 'fill_blank') {
          correct = userAnswer.toLowerCase() === q.answer.toLowerCase()
        } else if (q.type === 'true_false') {
          correct = userAnswer === q.answer
        } else {
          correct = userAnswer === q.answer
        }

        const score = correct ? 20 : 0
        const comment = correct 
          ? ['回答正确！太棒了！', '完全正确，继续保持！', '你真聪明！', '答对了，真厉害！'][Math.floor(Math.random() * 4)]
          : ['别灰心，再想想！', '没关系，下次一定行！', '加油，你可以的！', '仔细审题，再试一次！'][Math.floor(Math.random() * 4)]

        return {
          questionIndex: i,
          question: q.question,
          userAnswer,
          correctAnswer: q.answer,
          correct,
          score,
          comment,
          explanation: q.explanation,
        }
      })

      const correctCount = results.filter(r => r.correct).length
      const totalScore = results.reduce((sum, r) => sum + r.score, 0)

      resolve({
        score: totalScore,
        correctCount,
        totalQuestions: questions.length,
        results,
      })
    }, 1000)
  })
}

// 模拟AI讲解
export function mockExplain(_question: string, correctAnswer: string, explanation: string, subject: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const explanations: Record<string, string[]> = {
        math: [
          `这道题考查的是${subject}中的计算能力。\n\n正确答案是：${correctAnswer}\n\n${explanation}\n\n记住：做题时要仔细读题，看清数字和运算符号，一步一步来计算。`,
          `让我来帮你分析这道题：\n\n${explanation}\n\n所以正确答案是 ${correctAnswer}。\n\n做这类题目时，要掌握好计算方法，多练习就会越来越熟练！`,
        ],
        chinese: [
          `这道题考查的是语文基础知识。\n\n正确答案是：${correctAnswer}\n\n${explanation}\n\n学习语文要多读多记，理解课文内容，积累好词好句。`,
          `这道题的关键是理解课文内容。\n\n${explanation}\n\n所以答案是 ${correctAnswer}。\n\n平时要多阅读，注意理解文章的意思和作者想表达的情感。`,
        ],
        english: [
          `这道题考查的是英语基础知识。\n\n正确答案是：${correctAnswer}\n\n${explanation}\n\n学习英语要多听多说，记住常用的句型和单词。`,
          `让我来教你：\n\n${explanation}\n\n正确答案是 ${correctAnswer}。\n\n记住这个句型，以后遇到类似的题目就会做了！`,
        ],
      }
      const list = explanations[subject] || explanations.math
      resolve(list[Math.floor(Math.random() * list.length)])
    }, 1500)
  })
}

// 模拟生成变式练习
export function mockGenerateVariant(question: string, _knowledgePoint: string, _subject: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const variant = generateVariantQuestion({
        type: 'single_choice',
        question,
        options: [],
        answer: '',
        explanation: '',
      })
      resolve({ question: variant })
    }, 1500)
  })
}

// 模拟AI答疑
export function mockChat(question: string, subject: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const answers: Record<string, Record<string, string>> = {
        math: {
          '怎么计算两位数乘法': '两位数乘两位数可以用竖式计算：\n\n比如 23 × 45\n\n先算 23 × 5 = 115\n再算 23 × 40 = 920\n最后 115 + 920 = 1035\n\n记住：相同数位要对齐，从个位乘起！',
          '什么是面积': '面积就是物体表面或平面图形的大小。\n\n比如：课桌面的面积、教室地面的面积。\n\n常用的面积单位有：平方厘米、平方分米、平方米。\n\n计算长方形面积 = 长 × 宽',
          '时分秒怎么换算': '时间单位换算很简单：\n\n1小时 = 60分钟\n1分钟 = 60秒\n\n比如：2小时 = 120分钟\n半小时 = 30分钟\n\n记住：大单位化小单位用乘法，小单位化大单位用除法！',
        },
        chinese: {
          '什么是比喻句': '比喻句就是把一个事物比作另一个事物。\n\n要有三个部分：\n1. 本体（被比喻的事物）\n2. 喻体（用来作比的事物）\n3. 比喻词（像、好像、仿佛等）\n\n比如：月亮像圆盘。\n"月亮"是本体，"圆盘"是喻体，"像"是比喻词。',
          '怎么写好作文开头': '写好作文开头有几个小技巧：\n\n1. 开门见山：直接点明主题\n2. 设置悬念：引起读者兴趣\n3. 引用名言：增加文采\n4. 描写环境：渲染气氛\n\n比如写"我的妈妈"：\n"我的妈妈是世界上最好的妈妈，她的爱像阳光一样温暖着我。"',
          '什么是拟人句': '拟人句就是把事物当作人来写。\n\n让事物有人的动作、表情、思想、感情。\n\n比如：\n- 小鸟在唱歌。（小鸟像人一样唱歌）\n- 花儿在风中跳舞。（花儿像人一样跳舞）\n\n拟人句让文章更生动有趣！',
        },
        english: {
          'How are you 是什么意思': '"How are you?" 是英语中常用的问候语，意思是"你好吗？"\n\n常用回答：\n- I\'m fine, thank you.（我很好，谢谢）\n- Fine, thanks.（很好，谢谢）\n- Very well, thank you.（非常好，谢谢）\n\n回答后也可以问对方：And you?（你呢？）',
          '怎么记住英语单词': '记英语单词有几个好方法：\n\n1. 反复朗读：大声读出来\n2. 联想记忆：把单词和图像联系起来\n3. 制作卡片：正面写英文，背面写中文\n4. 多用多练：用单词造句\n\n比如记 "apple"：\n想象一个红红的苹果🍎，多读几遍 apple, apple, apple！',
          'What colour 是什么意思': '"What colour...?" 是问颜色的句型。\n\n比如：\n- What colour is it?（它是什么颜色？）\n- What colour is the apple?（苹果是什么颜色？）\n\n回答：\n- It\'s red.（它是红色的）\n- It\'s blue.（它是蓝色的）\n\n常见颜色：red红、yellow黄、blue蓝、green绿、white白、black黑',
        },
      }

      const subjectAnswers = answers[subject] || answers.math
      // 查找匹配的问题
      for (const [key, value] of Object.entries(subjectAnswers)) {
        if (question.includes(key) || key.includes(question)) {
          resolve(value)
          return
        }
      }
      // 默认回复
      resolve(`你好！我是AI学习助手🤖\n\n你问的是关于"${question}"的问题。\n\n这个问题很棒！让我用简单的话来解释：\n\n学习${subject}最重要的是：\n1. 上课认真听讲\n2. 课后及时复习\n3. 多做练习题\n4. 不懂就问\n\n如果有具体的问题，可以告诉我更详细的内容，我会尽力帮你解答！`)
    }, 1500)
  })
}
