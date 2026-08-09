export type ZhongkaoPhrase = {
  phrase: string;
  meaning: string;
  example: string;
  note: string;
};

export type ZhongkaoQuestion = {
  id: string;
  part: string;
  type: string;
  prompt: string;
  answer: string;
  options: string[];
  explanationEn: string;
  explanationZh: string;
  judgementZh: string;
};

export type ZhongkaoPaper = {
  id: string;
  date: string;
  topic: string;
  title: string;
  level: string;
  focus: string;
  phrases: ZhongkaoPhrase[];
  reading: string;
  speakingTask: string;
  grammarPoint: {
    title: string;
    explanation: string;
    examples: string[];
  };
  questions: ZhongkaoQuestion[];
  writingPrompt: string;
};

export const zhongkaoPapers: ZhongkaoPaper[] = [
  {
    id: "001",
    date: "2026-08-09",
    topic: "Junior High Life & Self Introduction",
    title: "中考衔接 001：初中生活与自我介绍",
    level: "小升初衔接 / 初一上预备",
    focus: "用一般现在时介绍自己和新学校",
    phrases: [
      {
        phrase: "be good at",
        meaning: "擅长",
        example: "I am good at drawing and English.",
        note: "后面接名词或动词-ing。"
      },
      {
        phrase: "make new friends",
        meaning: "交新朋友",
        example: "I hope to make new friends in my new class.",
        note: "中考写校园生活时很常用。"
      },
      {
        phrase: "be ready to",
        meaning: "准备好做某事；乐意做某事",
        example: "I am ready to help my classmates.",
        note: "to 后面接动词原形。"
      },
      {
        phrase: "learn from",
        meaning: "向……学习",
        example: "We can learn from each other.",
        note: "from 后面接学习对象。"
      },
      {
        phrase: "after class",
        meaning: "课后",
        example: "We often play basketball after class.",
        note: "不要写成 after the class，除非指某一节具体的课。"
      },
      {
        phrase: "on the first day",
        meaning: "第一天",
        example: "On the first day, our teacher smiled at us.",
        note: "具体某一天用 on。"
      },
      {
        phrase: "show sb around",
        meaning: "带某人参观",
        example: "A student showed us around the school.",
        note: "sb 放在 show 和 around 中间。"
      },
      {
        phrase: "feel nervous",
        meaning: "感到紧张",
        example: "I felt nervous before I met my new teachers.",
        note: "feel 后面接形容词。"
      }
    ],
    reading:
      "My name is Eric. I will start junior high school in September. On the first day, I may feel nervous, but I am also excited. I want to make new friends and learn from my teachers. I am good at drawing, and I am ready to join the art club. After class, I hope to play basketball with my classmates. If a new student comes to our school, I can show him around. I believe junior high life will be busy but interesting.",
    speakingTask: "朗读短文两遍，然后用 3 句话介绍自己：姓名、一个爱好、一个初中目标。",
    grammarPoint: {
      title: "一般现在时：介绍习惯、能力和真实情况",
      explanation: "介绍自己时常用一般现在时。主语是 I/We/You/They 时，动词用原形；主语是 he/she/it 或单数名词时，动词通常加 -s 或 -es。",
      examples: [
        "I like English.",
        "She likes English.",
        "We play basketball after class."
      ]
    },
    questions: [
      {
        id: "001-reading-1",
        part: "阅读 1",
        type: "细节理解",
        prompt: "When will Eric start junior high school?",
        answer: "In September.",
        options: ["In September.", "On Sunday.", "After class.", "In the art club."],
        explanationEn: "The text says Eric will start junior high school in September.",
        explanationZh: "原文第一句后面明确说 in September。",
        judgementZh: "先定位时间词，再核对句子主语。"
      },
      {
        id: "001-reading-2",
        part: "阅读 2",
        type: "人物心情",
        prompt: "How may Eric feel on the first day?",
        answer: "Nervous but excited.",
        options: ["Nervous but excited.", "Angry and tired.", "Bored and sleepy.", "Sad but quiet."],
        explanationEn: "The passage says he may feel nervous, but he is also excited.",
        explanationZh: "but 连接前后两种心情：nervous 和 excited。",
        judgementZh: "看到 but，要把转折前后都读完整。"
      },
      {
        id: "001-reading-3",
        part: "阅读 3",
        type: "词义理解",
        prompt: "Which phrase means 带某人参观?",
        answer: "show sb around",
        options: ["show sb around", "learn from", "be good at", "after class"],
        explanationEn: "Show someone around means take someone to see a place.",
        explanationZh: "show sb around 表示带某人参观某地。",
        judgementZh: "把短语放回文章场景里理解。"
      },
      {
        id: "001-grammar-1",
        part: "语法 1",
        type: "一般现在时",
        prompt: "Choose the correct sentence.",
        answer: "She likes music.",
        options: ["She likes music.", "She like music.", "She liking music.", "She is like music."],
        explanationEn: "With she, the verb like becomes likes in the simple present.",
        explanationZh: "主语 she 是第三人称单数，一般现在时动词要加 -s。",
        judgementZh: "先看主语，再看动词形式。"
      },
      {
        id: "001-blank-1",
        part: "填空 1",
        type: "词块运用",
        prompt: "I hope to ____ in my new class.",
        answer: "make new friends",
        options: ["make new friends", "feel nervous", "after class", "on the first day"],
        explanationEn: "Make new friends is the natural phrase for meeting new classmates.",
        explanationZh: "在新班级里希望交朋友，用 make new friends。",
        judgementZh: "先看句意，再看短语是否能接在 to 后面。"
      },
      {
        id: "001-correction-1",
        part: "改错 1",
        type: "常见错误",
        prompt: "Find the best correction: He are good at football.",
        answer: "He is good at football.",
        options: ["He is good at football.", "He am good at football.", "He be good at football.", "He good at football."],
        explanationEn: "Use is with he.",
        explanationZh: "he 搭配 be 动词 is。",
        judgementZh: "be 动词要和主语保持一致。"
      }
    ],
    writingPrompt: "用今天至少 3 个词块写 3-5 句话，介绍你升入初中后想做的一件事。"
  },
  {
    id: "002",
    date: "2026-08-10",
    topic: "School Rules & Daily Habits",
    title: "中考衔接 002：学校规则与日常习惯",
    level: "小升初衔接 / 初一上预备",
    focus: "用频率副词和情态动词谈规则",
    phrases: [
      {
        phrase: "arrive on time",
        meaning: "准时到达",
        example: "We should arrive at school on time.",
        note: "on time 表示按时，不迟到。"
      },
      {
        phrase: "follow the rules",
        meaning: "遵守规则",
        example: "Every student should follow the rules.",
        note: "rule 常用复数 rules。"
      },
      {
        phrase: "keep quiet",
        meaning: "保持安静",
        example: "We must keep quiet in the library.",
        note: "keep 后接形容词。"
      },
      {
        phrase: "hand in homework",
        meaning: "交作业",
        example: "I hand in homework before class.",
        note: "hand in 是动词短语。"
      },
      {
        phrase: "listen carefully",
        meaning: "认真听",
        example: "Good students listen carefully in class.",
        note: "carefully 是副词，修饰 listen。"
      },
      {
        phrase: "ask for help",
        meaning: "寻求帮助",
        example: "When I have a problem, I ask for help.",
        note: "ask sb for help 也很常见。"
      },
      {
        phrase: "tidy up",
        meaning: "整理",
        example: "We tidy up the classroom after school.",
        note: "可接 room, desk, classroom。"
      },
      {
        phrase: "be late for",
        meaning: "迟到",
        example: "Do not be late for class.",
        note: "for 后接迟到的事情。"
      }
    ],
    reading:
      "Our new school has some rules, but they help us study better. We should arrive on time every morning and never be late for class. In class, we listen carefully and ask for help when we do not understand. We must keep quiet in the library because others are reading. After school, we tidy up the classroom and hand in homework before we leave. These small habits make our school life easier and warmer.",
    speakingTask: "朗读短文，注意 must、should、never 的语气。然后说出你认为最重要的一条班规。",
    grammarPoint: {
      title: "情态动词 must / should / can",
      explanation: "must 表示必须，should 表示应该，can 表示能够或可以。情态动词后面接动词原形。",
      examples: [
        "We must keep quiet.",
        "You should listen carefully.",
        "Can I ask for help?"
      ]
    },
    questions: [
      {
        id: "002-reading-1",
        part: "阅读 1",
        type: "主旨理解",
        prompt: "What is the passage mainly about?",
        answer: "School rules and habits.",
        options: ["School rules and habits.", "A sports meeting.", "A family trip.", "A birthday party."],
        explanationEn: "The passage lists rules and habits at school.",
        explanationZh: "全文围绕学校规则和学习习惯展开。",
        judgementZh: "主旨题看每段反复出现的核心内容。"
      },
      {
        id: "002-reading-2",
        part: "阅读 2",
        type: "细节理解",
        prompt: "Where must students keep quiet?",
        answer: "In the library.",
        options: ["In the library.", "On the playground.", "At home.", "At the bus stop."],
        explanationEn: "The passage says students must keep quiet in the library.",
        explanationZh: "原文直接说 in the library。",
        judgementZh: "地点题优先找介词短语。"
      },
      {
        id: "002-grammar-1",
        part: "语法 1",
        type: "情态动词",
        prompt: "Choose the correct sentence.",
        answer: "We must follow the rules.",
        options: ["We must follow the rules.", "We must follows the rules.", "We must followed the rules.", "We must to follow the rules."],
        explanationEn: "After must, use the base verb follow.",
        explanationZh: "情态动词 must 后面接动词原形。",
        judgementZh: "看到 must/should/can，后面动词不加 s、不加 to。"
      },
      {
        id: "002-blank-1",
        part: "填空 1",
        type: "词块运用",
        prompt: "Please ____ in the reading room.",
        answer: "keep quiet",
        options: ["keep quiet", "be late for", "tidy up", "arrive on time"],
        explanationEn: "In a reading room, people should keep quiet.",
        explanationZh: "阅览室需要保持安静。",
        judgementZh: "根据地点判断行为。"
      },
      {
        id: "002-blank-2",
        part: "填空 2",
        type: "词块运用",
        prompt: "If you do not know the answer, you can ____.",
        answer: "ask for help",
        options: ["ask for help", "hand in homework", "be late for", "tidy up"],
        explanationEn: "Ask for help means get help from someone.",
        explanationZh: "不会答案时可以寻求帮助。",
        judgementZh: "根据 problem/answer/help 这些线索判断。"
      },
      {
        id: "002-correction-1",
        part: "改错 1",
        type: "常见错误",
        prompt: "Find the best correction: We should listens carefully.",
        answer: "We should listen carefully.",
        options: ["We should listen carefully.", "We should listening carefully.", "We should listened carefully.", "We should to listen carefully."],
        explanationEn: "After should, use listen.",
        explanationZh: "should 后面用动词原形 listen。",
        judgementZh: "情态动词后面的动词形式最容易丢分。"
      }
    ],
    writingPrompt: "写 3-5 句话介绍一条你愿意遵守的学校规则，并说明原因。"
  },
  {
    id: "003",
    date: "2026-08-11",
    topic: "Healthy Life & Exercise",
    title: "中考衔接 003：健康生活与运动",
    level: "小升初衔接 / 初一上预备",
    focus: "用建议句型谈健康习惯",
    phrases: [
      {
        phrase: "stay healthy",
        meaning: "保持健康",
        example: "We need good habits to stay healthy.",
        note: "stay 后接形容词。"
      },
      {
        phrase: "do exercise",
        meaning: "锻炼",
        example: "I do exercise for thirty minutes every day.",
        note: "exercise 作锻炼时常作不可数名词。"
      },
      {
        phrase: "drink enough water",
        meaning: "喝足够的水",
        example: "Drink enough water after running.",
        note: "enough 常放在名词前。"
      },
      {
        phrase: "go to bed early",
        meaning: "早睡",
        example: "Students should go to bed early.",
        note: "early 既可作副词，也可作形容词。"
      },
      {
        phrase: "feel tired",
        meaning: "感到累",
        example: "I feel tired when I sleep late.",
        note: "feel 后接形容词。"
      },
      {
        phrase: "have a balanced diet",
        meaning: "均衡饮食",
        example: "A balanced diet gives us energy.",
        note: "diet 在这里指日常饮食。"
      },
      {
        phrase: "be good for",
        meaning: "对……有好处",
        example: "Fruit is good for our health.",
        note: "for 后接对象。"
      },
      {
        phrase: "take a break",
        meaning: "休息一下",
        example: "Take a break when your eyes feel tired.",
        note: "break 在这里是休息。"
      }
    ],
    reading:
      "Many students want to stay healthy, but they are busy with schoolwork. My PE teacher gives us three pieces of advice. First, we should do exercise for at least twenty minutes a day. Running, swimming and playing ball games are all good for us. Second, we need a balanced diet and enough water. Third, we should go to bed early. If our eyes feel tired, we can take a break and look far away. Small habits can make a big difference.",
    speakingTask: "朗读短文，注意 advice、balanced、difference 的发音。然后用 should 说两条健康建议。",
    grammarPoint: {
      title: "建议句型：should / need to / can",
      explanation: "谈健康建议时，可以用 should 表示应该，用 need to 表示需要，用 can 表示可以。",
      examples: [
        "We should do exercise every day.",
        "Students need to drink enough water.",
        "You can take a break."
      ]
    },
    questions: [
      {
        id: "003-reading-1",
        part: "阅读 1",
        type: "数字细节",
        prompt: "How long should students exercise every day?",
        answer: "For at least twenty minutes.",
        options: ["For at least twenty minutes.", "For two hours.", "Only on Sunday.", "For five minutes."],
        explanationEn: "The text says at least twenty minutes a day.",
        explanationZh: "原文说 at least twenty minutes a day。",
        judgementZh: "数字题要看单位和频率。"
      },
      {
        id: "003-reading-2",
        part: "阅读 2",
        type: "细节理解",
        prompt: "What can students do when their eyes feel tired?",
        answer: "Take a break and look far away.",
        options: ["Take a break and look far away.", "Eat more candy.", "Sleep in class.", "Stop drinking water."],
        explanationEn: "The passage gives this advice near the end.",
        explanationZh: "文章结尾提到眼睛累时可以休息并看远处。",
        judgementZh: "根据 when 引导的条件定位答案。"
      },
      {
        id: "003-reading-3",
        part: "阅读 3",
        type: "词义理解",
        prompt: "Which phrase means 对……有好处?",
        answer: "be good for",
        options: ["be good for", "feel tired", "take a break", "go to bed early"],
        explanationEn: "Be good for means be helpful or healthy for someone or something.",
        explanationZh: "be good for 表示对某人或某物有好处。",
        judgementZh: "注意 be good at 是擅长，be good for 是有益于。"
      },
      {
        id: "003-grammar-1",
        part: "语法 1",
        type: "建议句型",
        prompt: "Choose the correct sentence.",
        answer: "You should go to bed early.",
        options: ["You should go to bed early.", "You should goes to bed early.", "You should to go to bed early.", "You should going to bed early."],
        explanationEn: "After should, use go.",
        explanationZh: "should 后面接动词原形 go。",
        judgementZh: "建议句里 should 后面的动词不变形。"
      },
      {
        id: "003-blank-1",
        part: "填空 1",
        type: "词块运用",
        prompt: "Fruit and vegetables are ____ our health.",
        answer: "good for",
        options: ["good for", "tired", "early", "enough water"],
        explanationEn: "Fruit and vegetables are good for health.",
        explanationZh: "水果和蔬菜对健康有好处。",
        judgementZh: "看到 health，可以联想到 be good for our health。"
      },
      {
        id: "003-correction-1",
        part: "改错 1",
        type: "常见错误",
        prompt: "Find the best correction: We need drink enough water.",
        answer: "We need to drink enough water.",
        options: ["We need to drink enough water.", "We need drinking enough water.", "We need drinks enough water.", "We need drank enough water."],
        explanationEn: "Need to is followed by the base verb drink.",
        explanationZh: "need to do sth 表示需要做某事。",
        judgementZh: "need 作实义动词时，后面常接 to do。"
      }
    ],
    writingPrompt: "用 should / need to / can 写 3-5 句话，给同学两条健康建议。"
  }
];

export function getZhongkaoPaper(id: string) {
  return zhongkaoPapers.find((paper) => paper.id === id);
}

export function getNextZhongkaoPaperId(id: string) {
  const index = zhongkaoPapers.findIndex((paper) => paper.id === id);
  return zhongkaoPapers[index + 1]?.id;
}

export function getPreviousZhongkaoPaperId(id: string) {
  const index = zhongkaoPapers.findIndex((paper) => paper.id === id);
  return zhongkaoPapers[index - 1]?.id;
}
