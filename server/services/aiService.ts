// AI 服务：调用大模型 API 生成题目、批改、讲解、答疑

const API_URL = process.env.AI_API_URL || 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = process.env.AI_API_KEY || '';
const MODEL = process.env.AI_MODEL || 'deepseek-chat';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callAI(messages: ChatMessage[], temperature = 0.7): Promise<string> {
  if (!API_KEY) {
    // 没有 API Key 时返回模拟数据，方便开发调试
    console.log('[AI Service] No API key, using mock response');
    return getMockResponse(messages);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Service] API error:', response.status, errorText);
      // 余额不足或其他 API 错误时，降级为模拟数据
      if (response.status === 402 || response.status === 401 || response.status === 429) {
        console.log('[AI Service] API unavailable, falling back to mock response');
        return getMockResponse(messages);
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json() as any;
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error('[AI Service] Error:', error);
    // 网络错误等也降级为模拟数据
    console.log('[AI Service] Network error, falling back to mock response');
    return getMockResponse(messages);
  }
}

// 模拟响应（用于无 API Key 或 API 不可用时的降级）
function getMockResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1].content;

  // 注意：变式题的 prompt 也包含“生成”“练习”字样，必须先判断变式分支
  if (lastMessage.includes('变式') || lastMessage.includes('同类型')) {
    return JSON.stringify({
      type: 'single_choice',
      question: '4 × 6 = ?',
      options: ['20', '24', '28', '32'],
      answer: '24',
      explanation: '4乘6表示4个6相加：6+6+6+6=24。乘法口诀"四六二十四"。',
    });
  }

  if (lastMessage.includes('生成') && lastMessage.includes('练习')) {
    return JSON.stringify([
      {
        type: 'single_choice',
        question: '3 × 7 = ?',
        options: ['18', '21', '24', '28'],
        answer: '21',
        explanation: '3乘7表示3个7相加：7+7+7=21。乘法口诀"三七二十一"。',
      },
      {
        type: 'true_false',
        question: '1米 = 100厘米',
        options: ['正确', '错误'],
        answer: '正确',
        explanation: '米和厘米的换算关系是：1米=100厘米。',
      },
      {
        type: 'fill_blank',
        question: '58 + 37 = ___',
        options: [],
        answer: '95',
        explanation: '先算50+30=80，再算8+7=15，最后80+15=95。',
      },
      {
        type: 'single_choice',
        question: '下面哪个数最大？',
        options: ['456', '465', '546', '564'],
        answer: '564',
        explanation: '比较三位数大小时，先比百位，再比十位，最后比个位。564的百位是5，比其他数都大。',
      },
      {
        type: 'true_false',
        question: '正方形有四条边，四条边都相等。',
        options: ['正确', '错误'],
        answer: '正确',
        explanation: '正方形的定义就是四条边都相等、四个角都是直角的四边形。',
      },
    ]);
  }
  
  if (lastMessage.includes('批改') || lastMessage.includes('判断对错')) {
    return JSON.stringify({
      correct: true,
      score: 100,
      comment: '回答正确！继续保持！',
    });
  }
  
  if (lastMessage.includes('讲解') || lastMessage.includes('解题思路')) {
    return '这道题的关键是要理解题目意思，一步一步来。首先，我们要看清楚题目问的是什么；然后，找到已知条件；最后，用学过的知识一步步计算。如果有不明白的地方，可以再读一遍题目，或者画图帮助理解。';
  }

  return '你好！我是AI学习助手。有什么问题可以问我哦！我会用简单的话帮你解答。';
}

// 生成练习题
export async function generateQuestions(
  subject: string,
  lessonTitle: string,
  knowledgePoints: string[],
  count: number = 5
): Promise<any[]> {
  const prompt = `你是一位小学${subject}老师，请为小学三年级学生生成${count}道练习题。

课程：${lessonTitle}
知识点：${knowledgePoints.join('、')}

要求：
1. 题目类型包括：单选题(single_choice)、判断题(true_false)、填空题(fill_blank)
2. 难度适合小学三年级学生
3. 每道题都要给出标准答案和适合小学生理解的详细解题方法
4. 返回JSON数组格式，每道题包含：type, question, options(选择题和判断题有), answer, explanation
5. 判断题options为["正确","错误"]
6. 填空题options为空数组

请直接返回JSON，不要其他内容。`;

  const content = await callAI([
    { role: 'system', content: '你是一位经验丰富的小学老师，擅长出题和讲解。' },
    { role: 'user', content: prompt },
  ]);

  try {
    // 提取JSON部分
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (e) {
    console.error('[AI Service] Failed to parse questions:', content);
    throw new Error('AI返回格式错误');
  }
}

// 批改答案
export async function gradeAnswer(
  question: string,
  userAnswer: string,
  correctAnswer: string,
  explanation: string
): Promise<{ correct: boolean; score: number; comment: string }> {
  // 简单判断：答案匹配即正确（实际可调用AI做更智能的判断）
  const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  
  if (isCorrect) {
    return {
      correct: true,
      score: 100,
      comment: '回答正确！你真棒！',
    };
  }

  // 如果答案不匹配，调用AI判断是否为等价答案或部分正确
  const prompt = `请判断学生的答案是否正确。

题目：${question}
标准答案：${correctAnswer}
学生答案：${userAnswer}

请返回JSON格式：{"correct": true/false, "score": 0-100, "comment": "给学生的评语"}
correct为true表示正确，false表示错误
score为得分（0-100）
comment要用鼓励的语气，适合小学生`;

  try {
    const content = await callAI([
      { role: 'system', content: '你是一位耐心的小学老师，批改作业时总是鼓励学生。' },
      { role: 'user', content: prompt },
    ], 0.3);

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('[AI Service] Grade error:', e);
  }

  return {
    correct: false,
    score: 0,
    comment: `正确答案是：${correctAnswer}\n\n${explanation}`,
  };
}

// 讲解错题
export async function explainQuestion(
  question: string,
  correctAnswer: string,
  explanation: string,
  subject: string
): Promise<string> {
  const prompt = `请用简单易懂的语言，给小学三年级学生讲解这道题。

题目：${question}
正确答案：${correctAnswer}
解题思路：${explanation}

要求：
1. 语言简单，适合小学生理解
2. 分步骤讲解
3. 可以举例子帮助理解
4. 语气亲切鼓励`;

  return callAI([
    { role: 'system', content: `你是一位温柔的${subject}老师，善于用简单的方式讲解难题。` },
    { role: 'user', content: prompt },
  ]);
}

// 生成变式练习
export async function generateVariantQuestion(
  originalQuestion: string,
  knowledgePoint: string,
  subject: string
): Promise<any> {
  const prompt = `基于这道原题，生成一道同类型的变式练习题。

原题：${originalQuestion}
知识点：${knowledgePoint}

要求：
1. 题目类型和难度与原题相似
2. 改变数字或情境，但考查同一知识点
3. 返回JSON格式：{"type": "single_choice/true_false/fill_blank", "question": "...", "options": [...], "answer": "...", "explanation": "..."}
4. 适合小学三年级学生`;

  const content = await callAI([
    { role: 'system', content: `你是一位${subject}老师，擅长出变式练习题。` },
    { role: 'user', content: prompt },
  ]);

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (e) {
    console.error('[AI Service] Failed to parse variant:', content);
    throw new Error('AI返回格式错误');
  }
}

// AI答疑
export async function chatWithAI(
  question: string,
  subject: string,
  _context?: string
): Promise<string> {
  const systemPrompt = `你是一位亲切的小学${subject}老师，专门帮助三年级学生解答学习问题。

要求：
1. 用简单易懂的语言解释
2. 可以举生活中的例子
3. 鼓励学生，保持耐心
4. 如果问题与${subject}无关，友好地引导学生回到学习话题`;

  return callAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: question },
  ]);
}
