export type VocabWord = {
  word: string;
  meaning: string;
  phonetic?: string;
  audioUrl?: string;
};

export type ComprehensionQuestion = {
  question: string;
  answer: string;
  studentAnswer: string;
  explanationEn: string;
  explanationZh: string;
  tag: string;
};

export type FillBlank = {
  sentenceBefore: string;
  sentenceAfter: string;
  answer: string;
  studentAnswer: string;
  explanationEn: string;
  explanationZh: string;
};

export type Correction = {
  prompt: string;
  answer: string;
  studentAnswer: string;
  explanationEn: string;
  explanationZh: string;
  tag: string;
};

export type WordStudy = {
  word: string;
  collocations: string[];
  similar: string[];
  note: string;
};

export type Paper = {
  id: string;
  version: string;
  date: string;
  topic: string;
  title: string;
  words: VocabWord[];
  reading: string;
  readingAudioUrl?: string;
  questions: ComprehensionQuestion[];
  wordStudy: WordStudy[];
  blanks: FillBlank[];
  corrections: Correction[];
  creativePrompt: string;
  examples: { en: string; zh: string }[];
};

export const TARGET_PAPER_COUNT = 320;
export const WORDS_PER_PAPER = 10;

export const papers: Paper[] = [
  {
    id: "001",
    version: "v1",
    date: "2026-08-04",
    topic: "Travel & Daily Life",
    title: "English Vocabulary Practice: Travel & Daily Life",
    words: [
      { word: "journey", meaning: "旅程", phonetic: "/ˈdʒɜːrni/", audioUrl: "/audio/papers/001/words/journey.mp3" },
      { word: "delay", meaning: "延误", phonetic: "/dɪˈleɪ/", audioUrl: "/audio/papers/001/words/delay.mp3" },
      { word: "platform", meaning: "站台", phonetic: "/ˈplætfɔːrm/", audioUrl: "/audio/papers/001/words/platform.mp3" },
      { word: "luggage", meaning: "行李", phonetic: "/ˈlʌɡɪdʒ/", audioUrl: "/audio/papers/001/words/luggage.mp3" },
      { word: "ticket", meaning: "票", phonetic: "/ˈtɪkɪt/", audioUrl: "/audio/papers/001/words/ticket.mp3" },
      { word: "passenger", meaning: "乘客", phonetic: "/ˈpæsɪndʒər/", audioUrl: "/audio/papers/001/words/passenger.mp3" },
      { word: "comfortable", meaning: "舒适的", phonetic: "/ˈkʌmftərbəl/", audioUrl: "/audio/papers/001/words/comfortable.mp3" },
      { word: "crowded", meaning: "拥挤的", phonetic: "/ˈkraʊdɪd/", audioUrl: "/audio/papers/001/words/crowded.mp3" },
      { word: "arrive", meaning: "到达", phonetic: "/əˈraɪv/", audioUrl: "/audio/papers/001/words/arrive.mp3" },
      { word: "miss", meaning: "错过；想念", phonetic: "/mɪs/", audioUrl: "/audio/papers/001/words/miss.mp3" }
    ],
    reading:
      "Last Saturday, Anna took a train to visit her cousin. Her journey started early in the morning. When she got to the station, she checked her ticket and walked to platform 3. There were many passengers, and the train was very crowded. Anna had a small suitcase as her luggage, so it was easy to carry. The train had a short delay, but her seat was quite comfortable. In the end, she arrived at her cousin's town at 11:30. She was happy because she didn't miss lunch with her cousin.",
    readingAudioUrl: "/audio/papers/001/reading.mp3",
    questions: [
      {
        question: "Where was Anna going?",
        answer: "She was going to visit her cousin.",
        studentAnswer: "She was going to the station.",
        explanationEn: "The station was only the place where she took the train. Her real purpose was to visit her cousin.",
        explanationZh: "station 只是她坐火车的地点，不是她出行的真正目的。她真正要去看望 cousin。",
        tag: "Reading detail"
      },
      {
        question: "Why was her luggage easy to carry?",
        answer: "Because she only had a small suitcase.",
        studentAnswer: "Because she had a small suitcase.",
        explanationEn: "This answer is acceptable. It catches the reason from the story.",
        explanationZh: "这个答案可以接受，抓住了原文中的原因。",
        tag: "Good answer"
      },
      {
        question: "What problem happened before or during the trip?",
        answer: "The train had a short delay.",
        studentAnswer: "There were many passengers and the train had a short delay.",
        explanationEn: "This is partly correct, but delay is the clearer travel problem.",
        explanationZh: "这个答案部分正确，但题目问 problem，最明确的问题是 delay。",
        tag: "Focus"
      },
      {
        question: "Did Anna arrive too late for lunch?",
        answer: "No, she didn't. She arrived in time for lunch.",
        studentAnswer: "Yes, she missed lunch.",
        explanationEn: "The text says she didn't miss lunch, so the answer should be negative.",
        explanationZh: "原文说 she didn't miss lunch，说明她没有错过午餐，所以回答应该是否定。",
        tag: "Negative detail"
      },
      {
        question: "Which word in the story means \"many people in one place\"?",
        answer: "crowded",
        studentAnswer: "comfortable",
        explanationEn: "Comfortable means pleasant to sit in, wear, or use. Crowded means full of people.",
        explanationZh: "comfortable 表示“舒服的”；crowded 才表示“人很多、拥挤的”。",
        tag: "Meaning"
      }
    ],
    wordStudy: [
      {
        word: "journey",
        collocations: ["a long journey", "a train journey", "start a journey", "make a journey"],
        similar: ["trip", "travel"],
        note: "journey focuses on the process of going from one place to another; trip often means a visit or journey with a return."
      },
      {
        word: "delay",
        collocations: ["a short delay", "a long delay", "flight delay", "train delay"],
        similar: ["wait", "hold-up"],
        note: "delay is a noun or verb for something happening later than planned; late is an adjective."
      },
      {
        word: "comfortable",
        collocations: ["a comfortable seat", "comfortable clothes", "feel comfortable"],
        similar: ["relaxed", "cosy"],
        note: "comfortable means pleasant; convenient means easy or useful; confident means sure about yourself."
      }
    ],
    blanks: [
      { sentenceBefore: "The train was full of people, so it was very", sentenceAfter: ".", answer: "crowded", studentAnswer: "comfortable", explanationEn: "Full of people means crowded.", explanationZh: "“满是人、人很多”要用 crowded。" },
      { sentenceBefore: "We had a two-hour", sentenceAfter: "because of bad weather.", answer: "delay", studentAnswer: "late", explanationEn: "Use the noun delay after two-hour.", explanationZh: "two-hour 后面需要名词 delay；late 是形容词。" },
      { sentenceBefore: "This chair is very", sentenceAfter: ". I can sit here all afternoon.", answer: "comfortable", studentAnswer: "convenient", explanationEn: "A chair feels comfortable.", explanationZh: "椅子坐起来“舒服”是 comfortable。" },
      { sentenceBefore: "My school is near my home, so it is very", sentenceAfter: "for me.", answer: "convenient", studentAnswer: "comfortable", explanationEn: "Living near school is convenient.", explanationZh: "学校离家近是“方便”，不是“舒服”。" },
      { sentenceBefore: "There were about 200", sentenceAfter: "on the plane.", answer: "passengers", studentAnswer: "passengers", explanationEn: "Passengers are people travelling in a vehicle.", explanationZh: "passengers 是乘客。" },
      { sentenceBefore: "I only took one bag, so I didn't have much", sentenceAfter: ".", answer: "luggage", studentAnswer: "luggages", explanationEn: "Luggage is usually uncountable.", explanationZh: "luggage 通常不可数，不加 -s。" },
      { sentenceBefore: "Our", sentenceAfter: "from Beijing to Shanghai took five hours.", answer: "journey", studentAnswer: "trip", explanationEn: "This sentence focuses on the travelling process.", explanationZh: "这里强调路上的过程，用 journey 更自然。" },
      { sentenceBefore: "We went on a school", sentenceAfter: "to the museum.", answer: "trip", studentAnswer: "journey", explanationEn: "School trip is a common collocation.", explanationZh: "school trip 是常见固定搭配。" },
      { sentenceBefore: "I like to", sentenceAfter: "by train.", answer: "travel", studentAnswer: "journey", explanationEn: "After like to, use a verb.", explanationZh: "like to 后面要接动词 travel。" },
      { sentenceBefore: "I was", sentenceAfter: "for class because I missed the bus.", answer: "late", studentAnswer: "delay", explanationEn: "Be late for class is the natural phrase.", explanationZh: "be late for class 是自然搭配。" }
    ],
    corrections: [
      { prompt: "The seat is very convenient, so I can sleep well.", answer: "The seat is very comfortable, so I can sleep well.", studentAnswer: "The seat is very confident, so I can sleep well.", explanationEn: "Confident describes a person; comfortable describes a seat.", explanationZh: "confident 描述“人自信”；comfortable 描述座位舒服。", tag: "Word choice" },
      { prompt: "We made a travel to London last summer.", answer: "We made a trip to London last summer.", studentAnswer: "We made a journey to London last summer.", explanationEn: "Make a trip is natural. Travel is usually a verb or uncountable noun.", explanationZh: "make a trip 是自然搭配；travel 常作动词或不可数名词。", tag: "Collocation" },
      { prompt: "There was a late, so the train arrived at 9:00.", answer: "There was a delay, so the train arrived at 9:00.", studentAnswer: "There was a wait, so the train arrived at 9:00.", explanationEn: "A delay is the reason a train or flight is later than planned.", explanationZh: "delay 表示火车、飞机等比计划时间晚。", tag: "Meaning" },
      { prompt: "My luggage are very heavy.", answer: "My luggage is very heavy.", studentAnswer: "My luggage are very heavy.", explanationEn: "Luggage is uncountable, so use is.", explanationZh: "luggage 不可数，所以谓语用 is。", tag: "Grammar" },
      { prompt: "The platform was comfortable because there were too many people.", answer: "The platform was crowded because there were too many people.", studentAnswer: "The platform was convenient because there were too many people.", explanationEn: "Too many people makes a place crowded.", explanationZh: "人太多会让一个地方 crowded。", tag: "Meaning" }
    ],
    creativePrompt: "Use five words from today's list to retell Anna's trip in three sentences.",
    examples: [
      { en: "The journey was long, but the view from the train was beautiful.", zh: "这段旅程很长，但是火车上的风景很美。" },
      { en: "Our flight had a delay because of heavy rain.", zh: "因为大雨，我们的航班延误了。" },
      { en: "The bus was crowded, so I had to stand.", zh: "公交车很拥挤，所以我只好站着。" }
    ]
  },
  {
    id: "002",
    version: "v2",
    date: "2026-08-09",
    topic: "Environment & Daily Choices",
    title: "English Daily Vocabulary: Environment & Daily Choices",
    words: [
      { word: "environment", meaning: "环境", phonetic: "/ɪnˈvaɪrənmənt/", audioUrl: "/audio/papers/002/words/environment.mp3" },
      { word: "recycle", meaning: "回收利用", phonetic: "/ˌriːˈsaɪkəl/", audioUrl: "/audio/papers/002/words/recycle.mp3" },
      { word: "pollution", meaning: "污染", phonetic: "/pəˈluːʃən/", audioUrl: "/audio/papers/002/words/pollution.mp3" },
      { word: "protect", meaning: "保护", phonetic: "/prəˈtekt/", audioUrl: "/audio/papers/002/words/protect.mp3" },
      { word: "waste", meaning: "浪费；废弃物", phonetic: "/weɪst/", audioUrl: "/audio/papers/002/words/waste.mp3" },
      { word: "energy", meaning: "能源；精力", phonetic: "/ˈenərdʒi/", audioUrl: "/audio/papers/002/words/energy.mp3" },
      { word: "local", meaning: "当地的", phonetic: "/ˈloʊkəl/", audioUrl: "/audio/papers/002/words/local.mp3" },
      { word: "reduce", meaning: "减少", phonetic: "/rɪˈduːs/", audioUrl: "/audio/papers/002/words/reduce.mp3" },
      { word: "plastic", meaning: "塑料；塑料的", phonetic: "/ˈplæstɪk/", audioUrl: "/audio/papers/002/words/plastic.mp3" },
      { word: "habit", meaning: "习惯", phonetic: "/ˈhæbɪt/", audioUrl: "/audio/papers/002/words/habit.mp3" }
    ],
    reading:
      "Mia's class started a project about the environment. Their teacher asked them to protect their town by changing one daily habit. Mia decided to use less plastic and always carry a bottle from home. Her friend Leo tried to recycle paper and cans. The students also wanted to reduce food waste at lunch. A local shop helped them by putting up posters about pollution. After one month, the class saved water and energy, and they felt proud of their small changes.",
    readingAudioUrl: "/audio/papers/002/reading.mp3",
    questions: [
      { question: "What was Mia's class project about?", answer: "It was about the environment.", studentAnswer: "It was about the local shop.", explanationEn: "The local shop only helped with posters. The main project was about the environment.", explanationZh: "local shop 只是帮忙贴海报，不是项目主题。项目主题是 environment。", tag: "Reading detail" },
      { question: "What daily habit did Mia change?", answer: "She used less plastic and carried a bottle from home.", studentAnswer: "She recycled paper and cans.", explanationEn: "Leo recycled paper and cans. Mia used less plastic and carried a bottle.", explanationZh: "这里混淆了人物。Leo 回收纸和罐子；Mia 少用塑料并自带水瓶。", tag: "Who did it?" },
      { question: "What did Leo try to recycle?", answer: "He tried to recycle paper and cans.", studentAnswer: "He tried to recycle plastic bags.", explanationEn: "The story says Leo recycled paper and cans.", explanationZh: "原文说 Leo 回收 paper and cans。", tag: "Reading detail" },
      { question: "Why did the local shop put up posters?", answer: "To tell people about pollution.", studentAnswer: "Because it wanted to sell bottles.", explanationEn: "The posters were about pollution, not selling bottles.", explanationZh: "海报内容是 pollution，不是卖瓶子。", tag: "Inference" },
      { question: "Which word means \"make something smaller or less\"?", answer: "reduce", studentAnswer: "protect", explanationEn: "Protect means keep safe. Reduce means make something smaller or less.", explanationZh: "protect 是“保护”；reduce 才是“减少”。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "protect", collocations: ["protect the environment", "protect animals", "protect someone from danger"], similar: ["save", "guard"], note: "protect means keep something safe; save can mean stop something from being lost or wasted." },
      { word: "reduce", collocations: ["reduce waste", "reduce pollution", "reduce the price"], similar: ["cut", "lower", "decrease"], note: "reduce means make something less; recycle means use something again in a new way." },
      { word: "waste", collocations: ["food waste", "plastic waste", "waste time", "waste money"], similar: ["rubbish", "trash"], note: "waste can be a noun or a verb." }
    ],
    blanks: [
      { sentenceBefore: "We should turn off lights to save", sentenceAfter: ".", answer: "energy", studentAnswer: "environment", explanationEn: "Turn off lights to save energy.", explanationZh: "关灯是为了节约 energy 能源。" },
      { sentenceBefore: "The river is dirty because of", sentenceAfter: ".", answer: "pollution", studentAnswer: "waste", explanationEn: "A dirty river is often caused by pollution.", explanationZh: "河水脏通常是因为 pollution 污染。" },
      { sentenceBefore: "Please don't", sentenceAfter: "food. Take only what you can eat.", answer: "waste", studentAnswer: "reduce", explanationEn: "Do not waste food means do not use food badly.", explanationZh: "waste food 是“浪费食物”。" },
      { sentenceBefore: "My family tries to", sentenceAfter: "paper and bottles.", answer: "recycle", studentAnswer: "protect", explanationEn: "Paper and bottles can be recycled.", explanationZh: "纸和瓶子可以 recycle 回收利用。" },
      { sentenceBefore: "Walking to school can help", sentenceAfter: "air pollution.", answer: "reduce", studentAnswer: "recycle", explanationEn: "Walking can reduce air pollution.", explanationZh: "步行可以 reduce 减少空气污染。" },
      { sentenceBefore: "This bag is made of", sentenceAfter: ".", answer: "plastic", studentAnswer: "pollution", explanationEn: "A bag can be made of plastic.", explanationZh: "袋子的材质可以是 plastic 塑料。" },
      { sentenceBefore: "The students want to", sentenceAfter: "animals in the park.", answer: "protect", studentAnswer: "save", explanationEn: "Protect animals is a common phrase.", explanationZh: "protect animals 是常见搭配。" },
      { sentenceBefore: "A", sentenceAfter: "farmer sells vegetables near our home.", answer: "local", studentAnswer: "location", explanationEn: "Local is an adjective before farmer.", explanationZh: "local 是形容词，表示“当地的”。" },
      { sentenceBefore: "Brushing your teeth twice a day is a good", sentenceAfter: ".", answer: "habit", studentAnswer: "custom", explanationEn: "A habit is something one person often does.", explanationZh: "habit 是个人习惯；custom 更像群体或文化习俗。" },
      { sentenceBefore: "Everyone can do something to help the", sentenceAfter: ".", answer: "environment", studentAnswer: "energy", explanationEn: "Help the environment is the natural phrase.", explanationZh: "help the environment 是自然表达。" }
    ],
    corrections: [
      { prompt: "We should recycle the environment by using less plastic.", answer: "We should protect the environment by using less plastic.", studentAnswer: "We should recycle the environment by using less plastic.", explanationEn: "Protect the environment is natural; recycle the environment is not.", explanationZh: "自然搭配是 protect the environment，不是 recycle the environment。", tag: "Collocation" },
      { prompt: "There is too many pollution in the city.", answer: "There is too much pollution in the city.", studentAnswer: "There is too many pollution in the city.", explanationEn: "Pollution is uncountable, so use much.", explanationZh: "pollution 不可数，所以用 much，不用 many。", tag: "Grammar" },
      { prompt: "Please reduce this bottle after you drink the water.", answer: "Please recycle this bottle after you drink the water.", studentAnswer: "Please reduce this bottle after you drink the water.", explanationEn: "A bottle can be recycled. Reduce means make less.", explanationZh: "瓶子可以 recycle；reduce 是“减少”。", tag: "Meaning" },
      { prompt: "It is a good custom to turn off the lights.", answer: "It is a good habit to turn off the lights.", studentAnswer: "It is a good custom to turn off the lights.", explanationEn: "Habit is personal. Custom is cultural or social.", explanationZh: "habit 是个人习惯；custom 是习俗。", tag: "Word choice" },
      { prompt: "The local shop is near of my school.", answer: "The local shop is near my school.", studentAnswer: "The local shop is near of my school.", explanationEn: "Near is followed directly by a noun.", explanationZh: "near 后面直接接名词，不需要 of。", tag: "Preposition" }
    ],
    creativePrompt: "Use at least four words from today's list. Write two sentences about one small change you can make this week.",
    examples: [
      { en: "We should protect the environment in small ways every day.", zh: "我们应该每天用小行动保护环境。" },
      { en: "A good habit can reduce waste.", zh: "一个好习惯可以减少浪费。" },
      { en: "Plastic pollution is a serious problem.", zh: "塑料污染是一个严重问题。" }
    ]
  },
  {
    id: "003",
    version: "v3",
    date: "2026-08-10",
    topic: "Health & Doctor Visit",
    title: "English Daily Vocabulary: Health & Doctor Visit",
    words: [
      { word: "appointment", meaning: "预约", phonetic: "/əˈpɔɪntmənt/", audioUrl: "/audio/papers/003/words/appointment.mp3" },
      { word: "medicine", meaning: "药", phonetic: "/ˈmedɪsən/", audioUrl: "/audio/papers/003/words/medicine.mp3" },
      { word: "temperature", meaning: "体温；温度", phonetic: "/ˈtemprətʃər/", audioUrl: "/audio/papers/003/words/temperature.mp3" },
      { word: "headache", meaning: "头痛", phonetic: "/ˈhedeɪk/", audioUrl: "/audio/papers/003/words/headache.mp3" },
      { word: "stomachache", meaning: "胃痛", phonetic: "/ˈstʌməkˌeɪk/", audioUrl: "/audio/papers/003/words/stomachache.mp3" },
      { word: "healthy", meaning: "健康的", phonetic: "/ˈhelθi/", audioUrl: "/audio/papers/003/words/healthy.mp3" },
      { word: "exercise", meaning: "锻炼；练习", phonetic: "/ˈeksərsaɪz/", audioUrl: "/audio/papers/003/words/exercise.mp3" },
      { word: "patient", meaning: "病人；有耐心的", phonetic: "/ˈpeɪʃənt/", audioUrl: "/audio/papers/003/words/patient.mp3" },
      { word: "recover", meaning: "康复", phonetic: "/rɪˈkʌvər/", audioUrl: "/audio/papers/003/words/recover.mp3" },
      { word: "advice", meaning: "建议", phonetic: "/ədˈvaɪs/", audioUrl: "/audio/papers/003/words/advice.mp3" }
    ],
    reading:
      "Lily had a headache and a stomachache on Monday morning, so her mother made an appointment with a doctor. At the clinic, the nurse checked Lily's temperature and asked her to sit with another patient. The doctor said Lily did not need strong medicine, but she should rest and drink warm water. He also gave her advice about sleep, food, and light exercise. Lily wanted to recover quickly, so she followed the doctor's words. After three days, she felt healthy again and went back to school.",
    readingAudioUrl: "/audio/papers/003/reading.mp3",
    questions: [
      { question: "Why did Lily's mother make an appointment?", answer: "Because Lily had a headache and a stomachache.", studentAnswer: "Because Lily wanted to do exercise.", explanationEn: "The first sentence gives the reason: Lily had a headache and a stomachache.", explanationZh: "第一句说明原因：Lily 头痛并且胃痛。", tag: "Reason" },
      { question: "What did the nurse check?", answer: "The nurse checked Lily's temperature.", studentAnswer: "The nurse checked Lily's medicine.", explanationEn: "The text says the nurse checked Lily's temperature.", explanationZh: "原文说护士检查了 Lily 的 temperature 体温。", tag: "Reading detail" },
      { question: "Did Lily need strong medicine?", answer: "No, she did not need strong medicine.", studentAnswer: "Yes, she needed strong medicine.", explanationEn: "The doctor said she did not need strong medicine.", explanationZh: "医生说她不需要 strong medicine。", tag: "Negative detail" },
      { question: "What advice did the doctor give?", answer: "He gave advice about sleep, food, and light exercise.", studentAnswer: "He gave advice about school homework.", explanationEn: "The doctor's advice was about sleep, food, and light exercise.", explanationZh: "医生的 advice 是关于睡眠、饮食和轻度锻炼。", tag: "Advice" },
      { question: "Which word means \"get well again\"?", answer: "recover", studentAnswer: "patient", explanationEn: "Recover means get well again. Patient means a sick person or someone who can wait calmly.", explanationZh: "recover 表示康复；patient 可以表示病人或有耐心的。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "advice", collocations: ["give advice", "take advice", "a piece of advice"], similar: ["suggestion", "tip"], note: "advice is uncountable, so say a piece of advice, not an advice." },
      { word: "medicine", collocations: ["take medicine", "strong medicine", "cold medicine"], similar: ["pill", "drug"], note: "medicine is often uncountable when it means something you take to feel better." },
      { word: "patient", collocations: ["a hospital patient", "be patient with someone", "patient care"], similar: ["sick person", "calm"], note: "patient can be a noun meaning a sick person, or an adjective meaning able to wait calmly." }
    ],
    blanks: [
      { sentenceBefore: "I have a doctor's", sentenceAfter: "at three o'clock.", answer: "appointment", studentAnswer: "advice", explanationEn: "A doctor's appointment is a planned time to see a doctor.", explanationZh: "doctor's appointment 表示预约好的看医生时间。" },
      { sentenceBefore: "You should take this", sentenceAfter: "after dinner.", answer: "medicine", studentAnswer: "temperature", explanationEn: "Take medicine is the natural phrase.", explanationZh: "take medicine 是常见搭配，表示吃药。" },
      { sentenceBefore: "The nurse checked my", sentenceAfter: "because I felt hot.", answer: "temperature", studentAnswer: "headache", explanationEn: "When someone feels hot, a nurse may check temperature.", explanationZh: "感觉发热时，护士会检查 temperature 体温。" },
      { sentenceBefore: "My head hurts. I have a", sentenceAfter: ".", answer: "headache", studentAnswer: "stomachache", explanationEn: "If your head hurts, you have a headache.", explanationZh: "头疼就是 headache。" },
      { sentenceBefore: "My stomach hurts. I have a", sentenceAfter: ".", answer: "stomachache", studentAnswer: "headache", explanationEn: "If your stomach hurts, you have a stomachache.", explanationZh: "胃或肚子疼是 stomachache。" },
      { sentenceBefore: "Sleep and good food help children stay", sentenceAfter: ".", answer: "healthy", studentAnswer: "patient", explanationEn: "Stay healthy means keep well.", explanationZh: "stay healthy 表示保持健康。" },
      { sentenceBefore: "Walking is light", sentenceAfter: "for many people.", answer: "exercise", studentAnswer: "medicine", explanationEn: "Walking is a kind of exercise.", explanationZh: "walking 是一种 exercise 锻炼。" },
      { sentenceBefore: "The doctor spoke to each", sentenceAfter: "carefully.", answer: "patient", studentAnswer: "appointment", explanationEn: "A patient is a person who is ill and sees a doctor.", explanationZh: "patient 作名词时表示病人。" },
      { sentenceBefore: "It took Lily three days to", sentenceAfter: "from her illness.", answer: "recover", studentAnswer: "exercise", explanationEn: "Recover from an illness means get well again.", explanationZh: "recover from an illness 表示从疾病中康复。" },
      { sentenceBefore: "The doctor gave us useful", sentenceAfter: "about sleep.", answer: "advice", studentAnswer: "advices", explanationEn: "Advice is uncountable, so do not add s.", explanationZh: "advice 不可数，不能加 s。" }
    ],
    corrections: [
      { prompt: "My teacher gave me an advice.", answer: "My teacher gave me a piece of advice.", studentAnswer: "My teacher gave me an advice.", explanationEn: "Advice is uncountable, so use a piece of advice.", explanationZh: "advice 不可数，常说 a piece of advice。", tag: "Grammar" },
      { prompt: "She took her temperature to the doctor.", answer: "She took her medicine to the doctor.", studentAnswer: "She took her temperature to the doctor.", explanationEn: "You take medicine. A nurse or doctor checks your temperature.", explanationZh: "take medicine 表示吃药；check temperature 表示量体温。", tag: "Collocation" },
      { prompt: "He has a stomachache in his head.", answer: "He has a headache.", studentAnswer: "He has a stomachache in his head.", explanationEn: "A headache is pain in the head. A stomachache is pain in the stomach.", explanationZh: "headache 是头痛；stomachache 是胃痛/肚子痛。", tag: "Meaning" },
      { prompt: "The patient was very patience.", answer: "The patient was very patient.", studentAnswer: "The patient was very patience.", explanationEn: "Patient can be a noun or adjective. Patience is the noun for the quality.", explanationZh: "patient 可作病人或有耐心的；patience 是“耐心”这个名词。", tag: "Word form" },
      { prompt: "I hope you recover your cold soon.", answer: "I hope you recover from your cold soon.", studentAnswer: "I hope you recover your cold soon.", explanationEn: "Use recover from an illness.", explanationZh: "表示从疾病中康复要用 recover from。", tag: "Preposition" }
    ],
    creativePrompt: "Use five words from today's list to write a short message to a classmate who is ill.",
    examples: [
      { en: "I have a doctor's appointment this afternoon.", zh: "我今天下午有一个医生预约。" },
      { en: "The nurse checked my temperature before I saw the doctor.", zh: "看医生前，护士给我量了体温。" },
      { en: "Good advice and light exercise can help you recover.", zh: "好的建议和轻度锻炼可以帮助你康复。" }
    ]
  },
  {
    id: "004",
    version: "v4",
    date: "2026-08-26",
    topic: "School & Study",
    title: "English Daily Vocabulary: School & Study",
    words: [
      { word: "subject", meaning: "学科；主题", phonetic: "/ˈsʌbdʒekt/", audioUrl: "/audio/papers/004/words/subject.mp3" },
      { word: "improve", meaning: "提高；改善", phonetic: "/ɪmˈpruːv/", audioUrl: "/audio/papers/004/words/improve.mp3" },
      { word: "exam", meaning: "考试", phonetic: "/ɪɡˈzæm/", audioUrl: "/audio/papers/004/words/exam.mp3" },
      { word: "mark", meaning: "分数；标记", phonetic: "/mɑːrk/", audioUrl: "/audio/papers/004/words/mark.mp3" },
      { word: "explain", meaning: "解释", phonetic: "/ɪkˈspleɪn/", audioUrl: "/audio/papers/004/words/explain.mp3" },
      { word: "practise", meaning: "练习", phonetic: "/ˈpræktɪs/", audioUrl: "/audio/papers/004/words/practise.mp3" },
      { word: "mistake", meaning: "错误", phonetic: "/mɪˈsteɪk/", audioUrl: "/audio/papers/004/words/mistake.mp3" },
      { word: "course", meaning: "课程", phonetic: "/kɔːrs/", audioUrl: "/audio/papers/004/words/course.mp3" },
      { word: "result", meaning: "结果；成绩", phonetic: "/rɪˈzʌlt/", audioUrl: "/audio/papers/004/words/result.mp3" },
      { word: "homework", meaning: "家庭作业", phonetic: "/ˈhoʊmwɜːrk/", audioUrl: "/audio/papers/004/words/homework.mp3" }
    ],
    reading:
      "Nina wanted to improve her English before an important exam. Her favourite subject was science, but English felt difficult. Her teacher asked her to join a short course after school and practise reading for twenty minutes every day. Nina did her homework carefully and wrote down each mistake in a small notebook. When she did not understand a sentence, she asked the teacher to explain it again. At the end of the month, Nina's mark was higher, and her result made her feel proud.",
    readingAudioUrl: "/audio/papers/004/reading.mp3",
    questions: [
      { question: "Why did Nina want to improve her English?", answer: "Because she had an important exam.", studentAnswer: "Because science was her favourite subject.", explanationEn: "Science was her favourite subject, but the reason she improved English was the important exam.", explanationZh: "science 是她喜欢的学科，但她提高英语的原因是 important exam。", tag: "Reason" },
      { question: "What course did Nina join?", answer: "She joined a short course after school.", studentAnswer: "She joined a science course before school.", explanationEn: "The text says she joined a short course after school.", explanationZh: "原文说她参加了 after school 的 short course。", tag: "Reading detail" },
      { question: "How long did Nina practise reading every day?", answer: "She practised reading for twenty minutes every day.", studentAnswer: "She practised reading for ten minutes every day.", explanationEn: "The exact detail is twenty minutes every day.", explanationZh: "这里要抓具体信息：每天 twenty minutes。", tag: "Exact detail" },
      { question: "What did Nina write in her small notebook?", answer: "She wrote down each mistake.", studentAnswer: "She wrote down each mark.", explanationEn: "She used the notebook to record mistakes, not marks.", explanationZh: "小本子记录的是 mistake 错误，不是 mark 分数。", tag: "Who/what" },
      { question: "Which word means \"make something better\"?", answer: "improve", studentAnswer: "explain", explanationEn: "Improve means make something better. Explain means make something clear.", explanationZh: "improve 是提高、改善；explain 是解释清楚。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "improve", collocations: ["improve English", "improve a mark", "improve quickly"], similar: ["get better", "develop"], note: "improve means become better or make something better; it is not the same as practise." },
      { word: "explain", collocations: ["explain a sentence", "explain the answer", "explain something to someone"], similar: ["describe", "show"], note: "explain focuses on making ideas clear; describe focuses on saying what something is like." },
      { word: "mark", collocations: ["get a good mark", "a high mark", "full marks"], similar: ["score", "grade"], note: "mark can mean a score in school, or a sign on paper." }
    ],
    blanks: [
      { sentenceBefore: "Maths is my favourite", sentenceAfter: "at school.", answer: "subject", studentAnswer: "course", explanationEn: "A school subject is an area like maths, English, or science.", explanationZh: "maths/English/science 这类学科用 subject。" },
      { sentenceBefore: "I want to", sentenceAfter: "my reading this month.", answer: "improve", studentAnswer: "explain", explanationEn: "Improve reading means make reading better.", explanationZh: "improve reading 表示提高阅读能力。" },
      { sentenceBefore: "We have an English", sentenceAfter: "on Friday.", answer: "exam", studentAnswer: "mark", explanationEn: "Have an exam is the natural phrase.", explanationZh: "have an exam 表示有一场考试。" },
      { sentenceBefore: "Lucy got a high", sentenceAfter: "in the test.", answer: "mark", studentAnswer: "result", explanationEn: "A high mark means a good score.", explanationZh: "high mark 表示高分。" },
      { sentenceBefore: "Can you", sentenceAfter: "this word to me?", answer: "explain", studentAnswer: "subject", explanationEn: "Explain something to someone is the correct pattern.", explanationZh: "explain something to someone 表示向某人解释某事。" },
      { sentenceBefore: "You need to", sentenceAfter: "speaking every day.", answer: "practise", studentAnswer: "improve", explanationEn: "Practise speaking means do speaking again and again.", explanationZh: "practise speaking 表示反复练习口语。" },
      { sentenceBefore: "I made one spelling", sentenceAfter: "in my homework.", answer: "mistake", studentAnswer: "mark", explanationEn: "Make a mistake is a fixed phrase.", explanationZh: "make a mistake 是固定搭配，表示犯错。" },
      { sentenceBefore: "This online", sentenceAfter: "helps students learn English.", answer: "course", studentAnswer: "subject", explanationEn: "An online course is a set of lessons.", explanationZh: "online course 是在线课程。" },
      { sentenceBefore: "The test", sentenceAfter: "was better than last time.", answer: "result", studentAnswer: "exam", explanationEn: "Result means what you get after a test or action.", explanationZh: "result 表示考试或行动后的结果。" },
      { sentenceBefore: "I finished my English", sentenceAfter: "before dinner.", answer: "homework", studentAnswer: "course", explanationEn: "Finish homework is the natural phrase.", explanationZh: "finish homework 表示完成作业。" }
    ],
    corrections: [
      { prompt: "I want to explain my English this year.", answer: "I want to improve my English this year.", studentAnswer: "I want to explain my English this year.", explanationEn: "Improve English means make your English better. Explain English means tell someone about English.", explanationZh: "improve English 是提高英语；explain English 是解释英语这个内容。", tag: "Word choice" },
      { prompt: "She got a good result in one question.", answer: "She got a good mark in one question.", studentAnswer: "She got a good result in one question.", explanationEn: "For a score on a question or test, mark is more natural.", explanationZh: "具体分数更常用 mark；result 更偏整体结果。", tag: "Meaning" },
      { prompt: "Please explain me this sentence.", answer: "Please explain this sentence to me.", studentAnswer: "Please explain me this sentence.", explanationEn: "Use explain something to someone.", explanationZh: "explain 的结构是 explain something to someone。", tag: "Grammar" },
      { prompt: "I made a wrong in my homework.", answer: "I made a mistake in my homework.", studentAnswer: "I made a wrong in my homework.", explanationEn: "Mistake is the noun. Wrong is usually an adjective.", explanationZh: "mistake 是名词；wrong 通常是形容词。", tag: "Word form" },
      { prompt: "He practised to read for twenty minutes.", answer: "He practised reading for twenty minutes.", studentAnswer: "He practised to read for twenty minutes.", explanationEn: "After practise, use the -ing form: practise reading.", explanationZh: "practise 后面常接动名词：practise reading。", tag: "Verb pattern" }
    ],
    creativePrompt: "Use five words from today's list to write a two-sentence study plan for this week.",
    examples: [
      { en: "I want to improve my exam result by doing homework carefully.", zh: "我想通过认真做作业来提高考试成绩。" },
      { en: "The teacher explained my mistake after class.", zh: "老师课后解释了我的错误。" },
      { en: "This course helps me practise English every day.", zh: "这门课程帮助我每天练习英语。" }
    ]
  },
  {
    id: "005",
    version: "v5",
    date: "2026-09-05",
    topic: "Food & Shopping",
    title: "English Daily Vocabulary: Food & Shopping",
    words: [
      { word: "customer", meaning: "客户；顾客", phonetic: "/ˈkʌstəmər/", audioUrl: "/audio/papers/005/words/customer.mp3" },
      { word: "receipt", meaning: "收据", phonetic: "/rɪˈsiːt/", audioUrl: "/audio/papers/005/words/receipt.mp3" },
      { word: "price", meaning: "价格", phonetic: "/praɪs/", audioUrl: "/audio/papers/005/words/price.mp3" },
      { word: "discount", meaning: "折扣", phonetic: "/ˈdɪskaʊnt/", audioUrl: "/audio/papers/005/words/discount.mp3" },
      { word: "fresh", meaning: "新鲜的", phonetic: "/freʃ/", audioUrl: "/audio/papers/005/words/fresh.mp3" },
      { word: "order", meaning: "点餐；订购", phonetic: "/ˈɔːrdər/", audioUrl: "/audio/papers/005/words/order.mp3" },
      { word: "menu", meaning: "菜单", phonetic: "/ˈmenjuː/", audioUrl: "/audio/papers/005/words/menu.mp3" },
      { word: "choose", meaning: "选择", phonetic: "/tʃuːz/", audioUrl: "/audio/papers/005/words/choose.mp3" },
      { word: "expensive", meaning: "昂贵的", phonetic: "/ɪkˈspensɪv/", audioUrl: "/audio/papers/005/words/expensive.mp3" },
      { word: "cheap", meaning: "便宜的", phonetic: "/tʃiːp/", audioUrl: "/audio/papers/005/words/cheap.mp3" }
    ],
    reading:
      "Amy went to a small cafe with her father after school. A friendly customer was asking about the price of a sandwich. Amy looked at the menu and wanted to choose something fresh. The fruit salad was cheap, but the pasta was more expensive. Her father had a discount card, so they could save some money. Amy decided to order the fruit salad and a bottle of water. After they paid, the waiter gave them a receipt. Amy learned to check the price before buying food.",
    readingAudioUrl: "/audio/papers/005/reading.mp3",
    questions: [
      { question: "Why did Amy and her father save some money?", answer: "Because her father had a discount card.", studentAnswer: "Because the pasta was cheap.", explanationEn: "The discount card helped them pay less. Cheap describes a low price, but the pasta was expensive.", explanationZh: "discount card 让他们少付钱；cheap 是价格低，但原文说 pasta 更贵。", tag: "Reason" },
      { question: "What did Amy choose to order?", answer: "She chose the fruit salad and a bottle of water.", studentAnswer: "She chose the pasta and a sandwich.", explanationEn: "Amy wanted something fresh and ordered the fruit salad and water.", explanationZh: "Amy 想要新鲜的东西，最后点了 fruit salad 和 water。", tag: "Reading detail" },
      { question: "What did the waiter give them after they paid?", answer: "The waiter gave them a receipt.", studentAnswer: "The waiter gave them a menu.", explanationEn: "A menu is used before ordering. A receipt is given after paying.", explanationZh: "menu 是点餐前看的菜单；receipt 是付款后的收据。", tag: "Sequence" },
      { question: "Which food was more expensive?", answer: "The pasta was more expensive.", studentAnswer: "The fruit salad was more expensive.", explanationEn: "The text says the fruit salad was cheap, but the pasta was more expensive.", explanationZh: "原文对比很清楚：fruit salad 便宜，pasta 更贵。", tag: "Comparison" },
      { question: "Which word means \"a list of food and drinks in a cafe or restaurant\"?", answer: "menu", studentAnswer: "receipt", explanationEn: "Menu means a list of food and drinks. Receipt means a piece of paper showing what you paid.", explanationZh: "menu 是菜单；receipt 是收据，记录你付了多少钱。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "price", collocations: ["a high price", "a low price", "check the price"], similar: ["cost", "value"], note: "price is the amount of money for something; cost can be the money you must pay or the verb meaning require money." },
      { word: "order", collocations: ["order food", "order online", "place an order"], similar: ["buy", "ask for"], note: "order can be a verb or a noun. In a cafe, order means ask for food or drink." },
      { word: "cheap", collocations: ["cheap food", "a cheap ticket", "cheap but useful"], similar: ["inexpensive", "low-cost"], note: "cheap means not expensive, but it can sometimes sound low quality. Low price is safer when you talk about the price itself." }
    ],
    blanks: [
      { sentenceBefore: "A", sentenceAfter: "asked the waiter for water.", answer: "customer", studentAnswer: "waiter", explanationEn: "A customer buys food or drinks. A waiter serves customers.", explanationZh: "customer 是顾客；waiter 是服务员。" },
      { sentenceBefore: "Please keep the", sentenceAfter: "after you pay.", answer: "receipt", studentAnswer: "menu", explanationEn: "You get a receipt after paying.", explanationZh: "付款后拿到的是 receipt 收据。" },
      { sentenceBefore: "The", sentenceAfter: "of the cake is three pounds.", answer: "price", studentAnswer: "discount", explanationEn: "Three pounds is the price.", explanationZh: "three pounds 表示价格 price。" },
      { sentenceBefore: "We got a ten percent", sentenceAfter: "with this card.", answer: "discount", studentAnswer: "price", explanationEn: "A ten percent discount means paying ten percent less.", explanationZh: "ten percent discount 表示九折或少付 10%。" },
      { sentenceBefore: "These apples are", sentenceAfter: "and sweet.", answer: "fresh", studentAnswer: "cheap", explanationEn: "Fresh describes food that is new and good to eat.", explanationZh: "fresh 描述食物新鲜。" },
      { sentenceBefore: "I want to", sentenceAfter: "a sandwich for lunch.", answer: "order", studentAnswer: "menu", explanationEn: "Order a sandwich means ask to buy it in a cafe or restaurant.", explanationZh: "order a sandwich 表示点一个三明治。" },
      { sentenceBefore: "The", sentenceAfter: "shows drinks, snacks and meals.", answer: "menu", studentAnswer: "receipt", explanationEn: "A menu shows food and drinks.", explanationZh: "menu 显示食物和饮料。" },
      { sentenceBefore: "You can", sentenceAfter: "one drink from the list.", answer: "choose", studentAnswer: "order", explanationEn: "Choose means pick one from several options.", explanationZh: "choose 表示从几个选项中选择一个。" },
      { sentenceBefore: "That coat is too", sentenceAfter: "for me to buy.", answer: "expensive", studentAnswer: "fresh", explanationEn: "Too expensive means it costs too much money.", explanationZh: "too expensive 表示太贵了。" },
      { sentenceBefore: "This notebook is only one pound, so it is", sentenceAfter: ".", answer: "cheap", studentAnswer: "expensive", explanationEn: "Only one pound shows it has a low price.", explanationZh: "only one pound 说明价格低，所以是 cheap。" }
    ],
    corrections: [
      { prompt: "The customer gave me a receipt after I paid.", answer: "The waiter gave me a receipt after I paid.", studentAnswer: "The customer gave me a receipt after I paid.", explanationEn: "The waiter gives the receipt. The customer pays and receives it.", explanationZh: "给收据的是 waiter；customer 是付款并拿收据的人。", tag: "Role" },
      { prompt: "This menu is very expensive.", answer: "This dish is very expensive.", studentAnswer: "This menu is very expensive.", explanationEn: "A menu is the list. A dish or meal can be expensive.", explanationZh: "menu 是菜单本身；真正贵的是 dish 或 meal。", tag: "Meaning" },
      { prompt: "I want to choose a sandwich from the waiter.", answer: "I want to order a sandwich from the waiter.", studentAnswer: "I want to choose a sandwich from the waiter.", explanationEn: "You choose from a menu, but order from a waiter.", explanationZh: "从菜单里 choose；向服务员 order。", tag: "Collocation" },
      { prompt: "The price is very cheap.", answer: "The price is very low.", studentAnswer: "The price is very cheap.", explanationEn: "Use low with price. Use cheap with the thing you buy.", explanationZh: "price 要搭配 low；cheap 描述买的东西便宜。", tag: "Collocation" },
      { prompt: "Can I have a discount price?", answer: "Can I have a discount?", studentAnswer: "Can I have a discount price?", explanationEn: "Have a discount or get a discount is natural. Discount price is less natural in this question.", explanationZh: "自然表达是 have/get a discount，直接问能不能打折。", tag: "Natural English" }
    ],
    creativePrompt: "Use five words from today's list to write a short cafe dialogue between a customer and a waiter.",
    examples: [
      { en: "The customer checked the price before placing an order.", zh: "顾客下单前看了价格。" },
      { en: "This cafe has fresh food and a useful menu.", zh: "这家咖啡馆有新鲜食物和实用菜单。" },
      { en: "The bag was expensive, but I got a discount.", zh: "这个包很贵，但我拿到了折扣。" }
    ]
  },
  {
    id: "006",
    version: "v6",
    date: "2026-09-06",
    topic: "Work & Free Time",
    title: "English Daily Vocabulary: Work & Free Time",
    words: [
      { word: "interview", meaning: "面试；采访", phonetic: "/ˈɪntərvjuː/", audioUrl: "/audio/papers/006/words/interview.mp3" },
      { word: "manager", meaning: "经理", phonetic: "/ˈmænɪdʒər/", audioUrl: "/audio/papers/006/words/manager.mp3" },
      { word: "meeting", meaning: "会议", phonetic: "/ˈmiːtɪŋ/", audioUrl: "/audio/papers/006/words/meeting.mp3" },
      { word: "busy", meaning: "忙碌的", phonetic: "/ˈbɪzi/", audioUrl: "/audio/papers/006/words/busy.mp3" },
      { word: "boring", meaning: "无聊的", phonetic: "/ˈbɔːrɪŋ/", audioUrl: "/audio/papers/006/words/boring.mp3" },
      { word: "exciting", meaning: "令人兴奋的", phonetic: "/ɪkˈsaɪtɪŋ/", audioUrl: "/audio/papers/006/words/exciting.mp3" },
      { word: "hobby", meaning: "爱好", phonetic: "/ˈhɑːbi/", audioUrl: "/audio/papers/006/words/hobby.mp3" },
      { word: "activity", meaning: "活动", phonetic: "/ækˈtɪvəti/", audioUrl: "/audio/papers/006/words/activity.mp3" },
      { word: "volunteer", meaning: "志愿者；自愿做", phonetic: "/ˌvɑːlənˈtɪr/", audioUrl: "/audio/papers/006/words/volunteer.mp3" },
      { word: "job", meaning: "工作", phonetic: "/dʒɑːb/", audioUrl: "/audio/papers/006/words/job.mp3" }
    ],
    reading:
      "Tom wanted a weekend job at the town library, so he went there for an interview. The manager was friendly, but she had a busy morning and asked Tom to wait before their meeting. Tom did not feel bored because he looked at posters for a reading activity. One poster invited students to volunteer on Saturdays. Tom said reading was his hobby, and helping younger children sounded exciting. After the meeting, the manager told Tom he could start next week. Tom was happy because the job matched his free time.",
    readingAudioUrl: "/audio/papers/006/reading.mp3",
    questions: [
      { question: "Why did Tom go to the library?", answer: "He went there for an interview for a weekend job.", studentAnswer: "He went there for a boring meeting with students.", explanationEn: "The first sentence says Tom wanted a weekend job and went for an interview.", explanationZh: "第一句说明 Tom 想找 weekend job，所以去图书馆参加 interview。", tag: "Reason" },
      { question: "Why did Tom have to wait?", answer: "Because the manager had a busy morning.", studentAnswer: "Because the manager was bored.", explanationEn: "Busy means having many things to do. The manager was busy, not bored.", explanationZh: "busy 是事情很多；boring/bored 是无聊。经理是忙，不是无聊。", tag: "Word choice" },
      { question: "What was Tom's hobby?", answer: "Reading was his hobby.", studentAnswer: "Working every Saturday was his hobby.", explanationEn: "Tom directly says reading was his hobby.", explanationZh: "原文直接说 reading was his hobby。", tag: "Reading detail" },
      { question: "What activity could students do on Saturdays?", answer: "They could volunteer to help younger children.", studentAnswer: "They could interview the manager.", explanationEn: "The poster invited students to volunteer, not to interview the manager.", explanationZh: "海报邀请学生 volunteer，不是 interview manager。", tag: "Inference" },
      { question: "Which word means \"a talk where someone asks questions before giving a job\"?", answer: "interview", studentAnswer: "meeting", explanationEn: "Interview is for asking questions about a job. Meeting is a planned discussion.", explanationZh: "interview 常指求职面试；meeting 是普通会议或会面。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "interview", collocations: ["have an interview", "go for an interview", "a job interview"], similar: ["meeting", "talk"], note: "An interview usually has questions for a job, school place, or news story. A meeting is a more general planned discussion." },
      { word: "boring", collocations: ["a boring film", "feel bored", "a boring job"], similar: ["dull", "not interesting"], note: "Boring describes the thing that makes you lose interest. Bored describes how a person feels." },
      { word: "volunteer", collocations: ["work as a volunteer", "volunteer at a library", "volunteer to help"], similar: ["helper", "offer"], note: "Volunteer can be a noun for a helper or a verb meaning offer to do something." }
    ],
    blanks: [
      { sentenceBefore: "I have a job", sentenceAfter: "at ten o'clock tomorrow.", answer: "interview", studentAnswer: "meeting", explanationEn: "A job interview is for getting a job.", explanationZh: "job interview 表示求职面试。" },
      { sentenceBefore: "The shop", sentenceAfter: "asked everyone to arrive early.", answer: "manager", studentAnswer: "customer", explanationEn: "A manager is the person who organizes workers.", explanationZh: "manager 是管理人员或经理。" },
      { sentenceBefore: "Our team has a short", sentenceAfter: "after lunch.", answer: "meeting", studentAnswer: "interview", explanationEn: "A meeting is a planned discussion for a group.", explanationZh: "meeting 是会议或会面。" },
      { sentenceBefore: "Mum is very", sentenceAfter: "today because she has many things to do.", answer: "busy", studentAnswer: "boring", explanationEn: "Having many things to do means busy.", explanationZh: "事情很多就是 busy。" },
      { sentenceBefore: "The film was", sentenceAfter: ", so I nearly fell asleep.", answer: "boring", studentAnswer: "bored", explanationEn: "The film is boring. A person feels bored.", explanationZh: "film 用 boring；人感到无聊用 bored。" },
      { sentenceBefore: "The football match was", sentenceAfter: "because both teams played well.", answer: "exciting", studentAnswer: "excited", explanationEn: "The match is exciting. People feel excited.", explanationZh: "match 用 exciting；人感到兴奋用 excited。" },
      { sentenceBefore: "Drawing is my favourite", sentenceAfter: "after school.", answer: "hobby", studentAnswer: "job", explanationEn: "A hobby is something you enjoy in free time.", explanationZh: "hobby 是业余爱好。" },
      { sentenceBefore: "The school reading", sentenceAfter: "starts at three.", answer: "activity", studentAnswer: "meeting", explanationEn: "An activity is something people do, often for fun or learning.", explanationZh: "activity 是活动，可以是学习或娱乐活动。" },
      { sentenceBefore: "I want to", sentenceAfter: "at the animal centre this summer.", answer: "volunteer", studentAnswer: "manager", explanationEn: "Volunteer can be a verb meaning offer to help.", explanationZh: "volunteer 作动词时表示自愿帮忙。" },
      { sentenceBefore: "My brother has a part-time", sentenceAfter: "in a cafe.", answer: "job", studentAnswer: "hobby", explanationEn: "A part-time job is work for part of the day or week.", explanationZh: "part-time job 是兼职工作。" }
    ],
    corrections: [
      { prompt: "I have a job meeting tomorrow, and the manager will ask me many questions.", answer: "I have a job interview tomorrow, and the manager will ask me many questions.", studentAnswer: "I have a job meeting tomorrow, and the manager will ask me many questions.", explanationEn: "When a manager asks questions before giving a job, it is a job interview.", explanationZh: "求职前经理提问叫 job interview，不是 job meeting。", tag: "Meaning" },
      { prompt: "The students were boring during the long meeting.", answer: "The students were bored during the long meeting.", studentAnswer: "The students were boring during the long meeting.", explanationEn: "People feel bored. Boring describes the thing that causes the feeling.", explanationZh: "人感到无聊用 bored；让人无聊的事物用 boring。", tag: "Adjective pair" },
      { prompt: "The activity was excited for younger children.", answer: "The activity was exciting for younger children.", studentAnswer: "The activity was excited for younger children.", explanationEn: "The activity is exciting. The children are excited.", explanationZh: "活动令人兴奋用 exciting；孩子感到兴奋用 excited。", tag: "Adjective pair" },
      { prompt: "She volunteered a manager at the library.", answer: "She volunteered at the library.", studentAnswer: "She volunteered a manager at the library.", explanationEn: "Volunteer at a place is natural. Manager is a job role, not something you volunteer.", explanationZh: "volunteer at a place 表示在某地做志愿服务；manager 是职位。", tag: "Collocation" },
      { prompt: "My hobby is a weekend job.", answer: "My hobby is reading on weekends.", studentAnswer: "My hobby is a weekend job.", explanationEn: "A hobby is something you do for enjoyment. A job is work, often for money.", explanationZh: "hobby 是兴趣爱好；job 是工作，通常和报酬有关。", tag: "Meaning" }
    ],
    creativePrompt: "Use five words from today's list to write a short message about how you spend free time and help others.",
    examples: [
      { en: "I have an interview for a weekend job at the library.", zh: "我有一个图书馆周末工作的面试。" },
      { en: "The meeting was not boring because we planned an exciting activity.", zh: "这次会议不无聊，因为我们计划了一个令人兴奋的活动。" },
      { en: "My hobby is reading, so I want to volunteer with younger children.", zh: "我的爱好是阅读，所以我想做志愿者帮助年纪小的孩子。" }
    ]
  },
  {
    id: "007",
    version: "v7",
    date: "2026-09-07",
    topic: "Home & Technology",
    title: "English Daily Vocabulary: Home & Technology",
    words: [
      { word: "repair", meaning: "修理", phonetic: "/rɪˈper/", audioUrl: "/audio/papers/007/words/repair.mp3" },
      { word: "screen", meaning: "屏幕", phonetic: "/skriːn/", audioUrl: "/audio/papers/007/words/screen.mp3" },
      { word: "device", meaning: "设备", phonetic: "/dɪˈvaɪs/", audioUrl: "/audio/papers/007/words/device.mp3" },
      { word: "online", meaning: "在线的；在线地", phonetic: "/ˌɑːnˈlaɪn/", audioUrl: "/audio/papers/007/words/online.mp3" },
      { word: "message", meaning: "信息；消息", phonetic: "/ˈmesɪdʒ/", audioUrl: "/audio/papers/007/words/message.mp3" },
      { word: "battery", meaning: "电池", phonetic: "/ˈbætəri/", audioUrl: "/audio/papers/007/words/battery.mp3" },
      { word: "charge", meaning: "充电；收费", phonetic: "/tʃɑːrdʒ/", audioUrl: "/audio/papers/007/words/charge.mp3" },
      { word: "useful", meaning: "有用的", phonetic: "/ˈjuːsfəl/", audioUrl: "/audio/papers/007/words/useful.mp3" },
      { word: "simple", meaning: "简单的", phonetic: "/ˈsɪmpəl/", audioUrl: "/audio/papers/007/words/simple.mp3" },
      { word: "problem", meaning: "问题", phonetic: "/ˈprɑːbləm/", audioUrl: "/audio/papers/007/words/problem.mp3" }
    ],
    reading:
      "Grace used her tablet for homework every evening. One day, the screen went dark, and she could not read an online message from her teacher. Grace thought the device had a serious problem, but her brother checked it calmly. He said the battery was empty and helped her charge it. After ten minutes, the tablet worked again. Grace was happy because the repair was simple and did not cost money. She learned that a useful device still needs care, and she promised to charge it before studying.",
    readingAudioUrl: "/audio/papers/007/reading.mp3",
    questions: [
      { question: "Why could Grace not read the teacher's message?", answer: "Because the screen went dark.", studentAnswer: "Because the teacher sent no message.", explanationEn: "The message existed, but Grace could not read it because the screen went dark.", explanationZh: "message 已经有了；Grace 读不了是因为 screen 变黑。", tag: "Reason" },
      { question: "What was the real problem with the tablet?", answer: "The battery was empty.", studentAnswer: "The screen was broken.", explanationEn: "Grace first thought the problem was serious, but her brother found the battery was empty.", explanationZh: "Grace 以为问题严重，但真正原因是 battery 没电。", tag: "Reading detail" },
      { question: "How did her brother help?", answer: "He helped her charge the tablet.", studentAnswer: "He bought a new device.", explanationEn: "He charged the tablet. He did not buy a new device.", explanationZh: "哥哥帮她 charge 充电，没有买新 device。", tag: "Action" },
      { question: "Why was Grace happy about the repair?", answer: "Because it was simple and did not cost money.", studentAnswer: "Because it was online and expensive.", explanationEn: "The repair was simple and free, so Grace was happy.", explanationZh: "repair 简单，而且没有花钱，所以 Grace 很高兴。", tag: "Reason" },
      { question: "Which word means \"a machine or tool such as a phone or tablet\"?", answer: "device", studentAnswer: "battery", explanationEn: "Device means a machine or tool. Battery is the part that stores power.", explanationZh: "device 是设备；battery 是供电的电池。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "charge", collocations: ["charge a phone", "charge a battery", "charge money"], similar: ["power", "ask for money"], note: "Charge can mean put power into a device, or ask someone to pay money." },
      { word: "repair", collocations: ["repair a phone", "repair a bike", "need repair"], similar: ["fix", "mend"], note: "Repair and fix both mean make something work again. Repair is a little more formal." },
      { word: "message", collocations: ["send a message", "receive a message", "read a message"], similar: ["note", "text"], note: "A message is information sent to someone. Text is often a phone message." }
    ],
    blanks: [
      { sentenceBefore: "Can you", sentenceAfter: "my old bike this weekend?", answer: "repair", studentAnswer: "charge", explanationEn: "Repair means make something work again.", explanationZh: "repair 表示修理，让东西重新能用。" },
      { sentenceBefore: "The phone", sentenceAfter: "is too small for me to read.", answer: "screen", studentAnswer: "battery", explanationEn: "You read words on a screen.", explanationZh: "文字显示在 screen 屏幕上。" },
      { sentenceBefore: "A tablet is a useful", sentenceAfter: "for studying.", answer: "device", studentAnswer: "message", explanationEn: "A tablet is a device.", explanationZh: "tablet 是一种 device 设备。" },
      { sentenceBefore: "We can buy tickets", sentenceAfter: "before we go to the cinema.", answer: "online", studentAnswer: "simple", explanationEn: "Buy tickets online means buy them on the internet.", explanationZh: "online 表示在网上。" },
      { sentenceBefore: "I sent my teacher a short", sentenceAfter: "about the homework.", answer: "message", studentAnswer: "screen", explanationEn: "Send a message is the natural phrase.", explanationZh: "send a message 是发送消息。" },
      { sentenceBefore: "The", sentenceAfter: "is empty, so the camera cannot work.", answer: "battery", studentAnswer: "device", explanationEn: "An empty battery has no power.", explanationZh: "battery 没电，设备就不能工作。" },
      { sentenceBefore: "Please", sentenceAfter: "your phone before the trip.", answer: "charge", studentAnswer: "repair", explanationEn: "Charge a phone means put power into it.", explanationZh: "charge a phone 表示给手机充电。" },
      { sentenceBefore: "This map is very", sentenceAfter: "when we travel.", answer: "useful", studentAnswer: "online", explanationEn: "Useful means helpful.", explanationZh: "useful 表示有帮助、有用。" },
      { sentenceBefore: "The question is", sentenceAfter: ", so most students can answer it.", answer: "simple", studentAnswer: "serious", explanationEn: "Simple means easy to understand or do.", explanationZh: "simple 表示简单、容易理解。" },
      { sentenceBefore: "There is a", sentenceAfter: "with my computer.", answer: "problem", studentAnswer: "message", explanationEn: "A problem is something wrong or difficult.", explanationZh: "problem 是问题或故障。" }
    ],
    corrections: [
      { prompt: "I need to charge my broken bike.", answer: "I need to repair my broken bike.", studentAnswer: "I need to charge my broken bike.", explanationEn: "You repair a broken bike. You charge a phone or battery.", explanationZh: "坏自行车要 repair；手机或电池才 charge。", tag: "Meaning" },
      { prompt: "The battery is dark, so I cannot see the words.", answer: "The screen is dark, so I cannot see the words.", studentAnswer: "The battery is dark, so I cannot see the words.", explanationEn: "A screen can be dark. A battery can be empty or low.", explanationZh: "screen 会变黑；battery 是 empty 或 low。", tag: "Collocation" },
      { prompt: "This online is useful for homework.", answer: "This device is useful for homework.", studentAnswer: "This online is useful for homework.", explanationEn: "Online is an adjective or adverb, not a thing. Device is the thing you use.", explanationZh: "online 不是一个具体东西；device 才是设备。", tag: "Word form" },
      { prompt: "I received a useful from my teacher.", answer: "I received a message from my teacher.", studentAnswer: "I received a useful from my teacher.", explanationEn: "Useful is an adjective. Message is the noun for information sent to you.", explanationZh: "useful 是形容词；收到的信息是 message。", tag: "Word form" },
      { prompt: "The repair was simply and quick.", answer: "The repair was simple and quick.", studentAnswer: "The repair was simply and quick.", explanationEn: "After was, use the adjective simple. Simply is an adverb.", explanationZh: "was 后面用形容词 simple；simply 是副词。", tag: "Grammar" }
    ],
    creativePrompt: "Use five words from today's list to write three tips for taking care of a phone or tablet.",
    examples: [
      { en: "Please charge the battery before your online class.", zh: "上网课前请给电池充电。" },
      { en: "The screen had a problem, so we took the device for repair.", zh: "屏幕出了问题，所以我们把设备拿去修理。" },
      { en: "A simple message can be useful when you need help.", zh: "需要帮助时，一条简单的信息可能很有用。" }
    ]
  },
  {
    id: "008",
    version: "v8",
    date: "2026-09-12",
    topic: "Sports & Weekend Activities",
    title: "English Daily Vocabulary: Sports & Weekend Activities",
    words: [
      { word: "match", meaning: "比赛", phonetic: "/mætʃ/", audioUrl: "/audio/papers/008/words/match.mp3" },
      { word: "team", meaning: "队；团队", phonetic: "/tiːm/", audioUrl: "/audio/papers/008/words/team.mp3" },
      { word: "coach", meaning: "教练", phonetic: "/koʊtʃ/", audioUrl: "/audio/papers/008/words/coach.mp3" },
      { word: "player", meaning: "运动员；选手", phonetic: "/ˈpleɪər/", audioUrl: "/audio/papers/008/words/player.mp3" },
      { word: "competition", meaning: "竞赛；比赛", phonetic: "/ˌkɑːmpəˈtɪʃən/", audioUrl: "/audio/papers/008/words/competition.mp3" },
      { word: "stadium", meaning: "体育场", phonetic: "/ˈsteɪdiəm/", audioUrl: "/audio/papers/008/words/stadium.mp3" },
      { word: "train", meaning: "训练；培训", phonetic: "/treɪn/", audioUrl: "/audio/papers/008/words/train.mp3" },
      { word: "win", meaning: "赢；获胜", phonetic: "/wɪn/", audioUrl: "/audio/papers/008/words/win.mp3" },
      { word: "lose", meaning: "输；丢失", phonetic: "/luːz/", audioUrl: "/audio/papers/008/words/lose.mp3" },
      { word: "prize", meaning: "奖品；奖项", phonetic: "/praɪz/", audioUrl: "/audio/papers/008/words/prize.mp3" }
    ],
    reading:
      "On Saturday, Ben's football team went to a small stadium for an important match. Their coach told every player to warm up carefully and listen to each other. The match was part of a school competition, so many families came to watch. Ben's team did not start well and nearly lost the first half. During the break, the coach asked them to stay calm and train their minds, not only their bodies. In the second half, Ben scored the last goal, and his team won the game. They did not win a big prize, but they felt proud because they worked together.",
    readingAudioUrl: "/audio/papers/008/reading.mp3",
    questions: [
      { question: "Where did Ben's team play the match?", answer: "They played at a small stadium.", studentAnswer: "They played in a classroom.", explanationEn: "The text says the team went to a small stadium for the match.", explanationZh: "原文说他们去 small stadium 比赛，不是在 classroom。", tag: "Place" },
      { question: "What did the coach ask every player to do before the match?", answer: "He asked them to warm up carefully and listen to each other.", studentAnswer: "He asked them to win a big prize.", explanationEn: "Before the match, the coach focused on warming up and teamwork.", explanationZh: "比赛前 coach 强调热身和互相配合，不是先要求 prize。", tag: "Reading detail" },
      { question: "Why did many families come to watch?", answer: "Because the match was part of a school competition.", studentAnswer: "Because Ben was the only player.", explanationEn: "The school competition made the match important for families.", explanationZh: "很多家庭来看，是因为这是 school competition 的一部分。", tag: "Reason" },
      { question: "Did Ben's team lose the game?", answer: "No, they won the game.", studentAnswer: "Yes, they lost the game.", explanationEn: "They nearly lost the first half, but they won the game in the end.", explanationZh: "他们上半场差点输，但最后 won the game。", tag: "Negative detail" },
      { question: "Which word means \"a person who teaches sports\"?", answer: "coach", studentAnswer: "player", explanationEn: "A coach teaches or trains a team. A player takes part in the game.", explanationZh: "coach 是教练；player 是参加比赛的队员。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "match", collocations: ["a football match", "watch a match", "win a match"], similar: ["game", "competition"], note: "Match and game can both mean a sports event. Competition often means a larger contest with winners." },
      { word: "win", collocations: ["win a match", "win a prize", "win the game"], similar: ["beat", "succeed"], note: "Win focuses on the result. Beat needs an object, such as beat another team." },
      { word: "train", collocations: ["train hard", "train a team", "train for a match"], similar: ["practise", "prepare"], note: "Train means prepare through regular practice; it can also mean teach someone a skill." }
    ],
    blanks: [
      { sentenceBefore: "Our football", sentenceAfter: "starts at three o'clock.", answer: "match", studentAnswer: "team", explanationEn: "A match is the sports event.", explanationZh: "match 是比赛本身。" },
      { sentenceBefore: "Each", sentenceAfter: "has eleven players on the field.", answer: "team", studentAnswer: "stadium", explanationEn: "A team is a group of players.", explanationZh: "team 是一组队员。" },
      { sentenceBefore: "The", sentenceAfter: "taught us how to pass the ball.", answer: "coach", studentAnswer: "player", explanationEn: "A coach teaches players.", explanationZh: "coach 是教练，负责指导队员。" },
      { sentenceBefore: "She is the best tennis", sentenceAfter: "in our school.", answer: "player", studentAnswer: "coach", explanationEn: "A player takes part in a sport.", explanationZh: "player 是参加运动或比赛的人。" },
      { sentenceBefore: "The singing", sentenceAfter: "has three rounds.", answer: "competition", studentAnswer: "match", explanationEn: "A competition can have rounds and many people trying to win.", explanationZh: "competition 是竞赛，可以有多个轮次。" },
      { sentenceBefore: "Thousands of people watched the game in the", sentenceAfter: ".", answer: "stadium", studentAnswer: "team", explanationEn: "A stadium is a large place for sports events.", explanationZh: "stadium 是体育场。" },
      { sentenceBefore: "We need to", sentenceAfter: "three times a week before the final.", answer: "train", studentAnswer: "win", explanationEn: "Train means practise regularly before an event.", explanationZh: "train 表示为比赛进行训练。" },
      { sentenceBefore: "I hope we can", sentenceAfter: "the match tomorrow.", answer: "win", studentAnswer: "prize", explanationEn: "Win the match is the natural phrase.", explanationZh: "win the match 表示赢得比赛。" },
      { sentenceBefore: "If we don't listen to each other, we may", sentenceAfter: "the game.", answer: "lose", studentAnswer: "miss", explanationEn: "Lose the game means not win it.", explanationZh: "lose the game 表示输掉比赛。" },
      { sentenceBefore: "The first prize was a new football.", sentenceAfter: "", answer: "prize", studentAnswer: "price", explanationEn: "Prize is something you win. Price is the money something costs.", explanationZh: "prize 是奖品；price 是价格。注意拼写只差一个字母。"}
    ],
    corrections: [
      { prompt: "Our team won a price in the competition.", answer: "Our team won a prize in the competition.", studentAnswer: "Our team won a price in the competition.", explanationEn: "Prize means an award. Price means cost.", explanationZh: "prize 是奖品；price 是价格。", tag: "Spelling meaning" },
      { prompt: "The coach played every goal for us.", answer: "The player scored every goal for us.", studentAnswer: "The coach played every goal for us.", explanationEn: "A player scores goals. A coach trains and guides the team.", explanationZh: "player 进球；coach 负责训练和指导。", tag: "Role" },
      { prompt: "We trained the match by two goals.", answer: "We won the match by two goals.", studentAnswer: "We trained the match by two goals.", explanationEn: "Win by two goals describes the result. Train means practise.", explanationZh: "win by two goals 表示赢了两个球；train 是训练。", tag: "Word choice" },
      { prompt: "There were many teams in the football stadium competition.", answer: "There were many teams in the football competition.", studentAnswer: "There were many teams in the football stadium competition.", explanationEn: "Competition is the event. Stadium is the place.", explanationZh: "competition 是赛事；stadium 是地点。", tag: "Meaning" },
      { prompt: "I don't want to lose my team tomorrow.", answer: "I don't want my team to lose tomorrow.", studentAnswer: "I don't want to lose my team tomorrow.", explanationEn: "Lose my team sounds like you cannot find the team. For a bad result, say my team lose.", explanationZh: "lose my team 像是“找不到队伍”；比赛输了要说 my team lose。", tag: "Sentence pattern" }
    ],
    creativePrompt: "Use five words from today's list to write a short pep talk from a coach before a match.",
    examples: [
      { en: "The coach helped every player train for the match.", zh: "教练帮助每位队员为比赛训练。" },
      { en: "Our team did not win a prize, but we enjoyed the competition.", zh: "我们队没有赢得奖品，但我们享受了这场竞赛。" },
      { en: "The stadium was full when the final match started.", zh: "决赛开始时，体育场坐满了人。" }
    ]
  },
  {
    id: "009",
    version: "v9",
    date: "2026-09-13",
    topic: "Weather & Plans",
    title: "English Daily Vocabulary: Weather & Plans",
    words: [
      { word: "weather", meaning: "天气", phonetic: "/ˈweðər/", audioUrl: "/audio/papers/009/words/weather.mp3" },
      { word: "forecast", meaning: "天气预报；预测", phonetic: "/ˈfɔːrkæst/", audioUrl: "/audio/papers/009/words/forecast.mp3" },
      { word: "umbrella", meaning: "雨伞", phonetic: "/ʌmˈbrelə/", audioUrl: "/audio/papers/009/words/umbrella.mp3" },
      { word: "raincoat", meaning: "雨衣", phonetic: "/ˈreɪnkoʊt/", audioUrl: "/audio/papers/009/words/raincoat.mp3" },
      { word: "cloudy", meaning: "多云的", phonetic: "/ˈklaʊdi/", audioUrl: "/audio/papers/009/words/cloudy.mp3" },
      { word: "sunny", meaning: "晴朗的", phonetic: "/ˈsʌni/", audioUrl: "/audio/papers/009/words/sunny.mp3" },
      { word: "windy", meaning: "有风的", phonetic: "/ˈwɪndi/", audioUrl: "/audio/papers/009/words/windy.mp3" },
      { word: "storm", meaning: "暴风雨", phonetic: "/stɔːrm/", audioUrl: "/audio/papers/009/words/storm.mp3" },
      { word: "picnic", meaning: "野餐", phonetic: "/ˈpɪknɪk/", audioUrl: "/audio/papers/009/words/picnic.mp3" },
      { word: "cancel", meaning: "取消", phonetic: "/ˈkænsəl/", audioUrl: "/audio/papers/009/words/cancel.mp3" }
    ],
    reading:
      "Emma and her friends planned a picnic in the park on Sunday. On Saturday evening, Emma checked the weather forecast because the sky looked cloudy. The forecast said Sunday morning would be windy, but the afternoon might be sunny. Emma packed an umbrella and a raincoat just in case. On Sunday, a short storm came before lunch, so the friends waited at home. They did not cancel the picnic because the sun came out later. In the afternoon, the weather was warm and bright, and everyone enjoyed their food under the trees.",
    readingAudioUrl: "/audio/papers/009/reading.mp3",
    questions: [
      { question: "Why did Emma check the forecast?", answer: "Because the sky looked cloudy and they planned a picnic.", studentAnswer: "Because she wanted to cancel school.", explanationEn: "Emma checked the weather forecast for the picnic plan, not for school.", explanationZh: "Emma 查 forecast 是为了 picnic 计划，不是为了取消上学。", tag: "Reason" },
      { question: "What did Emma pack just in case?", answer: "She packed an umbrella and a raincoat.", studentAnswer: "She packed a storm and a cloud.", explanationEn: "An umbrella and a raincoat are things you can take with you. Storm and cloud are weather conditions.", explanationZh: "umbrella 和 raincoat 是能带走的物品；storm 和 cloud 是天气现象。", tag: "Object" },
      { question: "What happened before lunch on Sunday?", answer: "A short storm came.", studentAnswer: "It was sunny all morning.", explanationEn: "The story says a short storm came before lunch.", explanationZh: "原文说午饭前来了 a short storm。", tag: "Reading detail" },
      { question: "Did the friends cancel the picnic?", answer: "No, they did not cancel it.", studentAnswer: "Yes, they cancelled it.", explanationEn: "They waited at home first, but they did not cancel the picnic.", explanationZh: "他们先在家等，但没有 cancel picnic。", tag: "Negative detail" },
      { question: "Which word means \"stop a plan from happening\"?", answer: "cancel", studentAnswer: "forecast", explanationEn: "Cancel means stop a plan. Forecast means say what may happen later, especially about weather.", explanationZh: "cancel 是取消计划；forecast 是预测，尤其是天气预报。", tag: "Meaning" }
    ],
    wordStudy: [
      { word: "forecast", collocations: ["weather forecast", "check the forecast", "the forecast says"], similar: ["prediction", "report"], note: "Forecast often means information about future weather. It can be a noun or a verb." },
      { word: "cancel", collocations: ["cancel a plan", "cancel a trip", "cancel a class"], similar: ["stop", "call off"], note: "Cancel means decide that something planned will not happen." },
      { word: "weather", collocations: ["bad weather", "warm weather", "check the weather"], similar: ["climate", "conditions"], note: "Weather is about a short time, such as today. Climate is about a place over many years." }
    ],
    blanks: [
      { sentenceBefore: "The", sentenceAfter: "is warm today, so we can play outside.", answer: "weather", studentAnswer: "forecast", explanationEn: "Weather describes what the day is like.", explanationZh: "weather 表示当天的天气情况。" },
      { sentenceBefore: "The weather", sentenceAfter: "says it may rain tomorrow.", answer: "forecast", studentAnswer: "storm", explanationEn: "A forecast tells us what the weather may be like later.", explanationZh: "forecast 是天气预报，预测之后的天气。" },
      { sentenceBefore: "Take an", sentenceAfter: "because it may rain.", answer: "umbrella", studentAnswer: "raincoat", explanationEn: "An umbrella keeps rain off your head. A raincoat is clothing.", explanationZh: "umbrella 是雨伞；raincoat 是雨衣。" },
      { sentenceBefore: "He wore a yellow", sentenceAfter: "on the rainy walk.", answer: "raincoat", studentAnswer: "umbrella", explanationEn: "Wear a raincoat is natural. Carry an umbrella is natural.", explanationZh: "雨衣是穿的 raincoat；雨伞是拿的 umbrella。"},
      { sentenceBefore: "It is", sentenceAfter: ", so we cannot see the sun clearly.", answer: "cloudy", studentAnswer: "sunny", explanationEn: "Cloudy means there are many clouds.", explanationZh: "cloudy 表示云很多，看不清太阳。" },
      { sentenceBefore: "It was", sentenceAfter: "in the afternoon, so the park was bright.", answer: "sunny", studentAnswer: "windy", explanationEn: "Sunny means bright with sun.", explanationZh: "sunny 表示晴朗、有阳光。" },
      { sentenceBefore: "It is too", sentenceAfter: "to fly a paper plane outside.", answer: "windy", studentAnswer: "cloudy", explanationEn: "Windy means there is a lot of wind.", explanationZh: "windy 表示风很大。" },
      { sentenceBefore: "A strong", sentenceAfter: "broke some tree branches last night.", answer: "storm", studentAnswer: "picnic", explanationEn: "A storm has strong wind and often rain.", explanationZh: "storm 是暴风雨，可能带来强风和雨。" },
      { sentenceBefore: "We had a", sentenceAfter: "by the lake and ate sandwiches.", answer: "picnic", studentAnswer: "forecast", explanationEn: "A picnic is a meal eaten outside.", explanationZh: "picnic 是户外野餐。" },
      { sentenceBefore: "If it rains heavily, we will", sentenceAfter: "the trip.", answer: "cancel", studentAnswer: "forecast", explanationEn: "Cancel the trip means stop the planned trip.", explanationZh: "cancel the trip 表示取消旅行计划。" }
    ],
    corrections: [
      { prompt: "The weather says it will rain tomorrow.", answer: "The forecast says it will rain tomorrow.", studentAnswer: "The weather says it will rain tomorrow.", explanationEn: "A forecast can say what will happen. Weather itself does not speak.", explanationZh: "forecast 可以“说”明天天气；weather 本身不会说话。", tag: "Collocation" },
      { prompt: "Please wear an umbrella when it rains.", answer: "Please carry an umbrella when it rains.", studentAnswer: "Please wear an umbrella when it rains.", explanationEn: "We carry or use an umbrella. We wear a raincoat.", explanationZh: "umbrella 要 carry/use；raincoat 才是 wear。", tag: "Verb choice" },
      { prompt: "The sky is sunny, so I cannot see the sun.", answer: "The sky is cloudy, so I cannot see the sun.", studentAnswer: "The sky is sunny, so I cannot see the sun.", explanationEn: "If you cannot see the sun, cloudy is more logical than sunny.", explanationZh: "看不见太阳通常是 cloudy，不是 sunny。", tag: "Meaning" },
      { prompt: "We cancelled at home until the storm stopped.", answer: "We waited at home until the storm stopped.", studentAnswer: "We cancelled at home until the storm stopped.", explanationEn: "Cancel needs an object such as a picnic or trip. Wait at home describes the action here.", explanationZh: "cancel 后面要接 plan/trip/picnic；这里动作是 wait at home。", tag: "Verb pattern" },
      { prompt: "The picnic was windy, so we ate food in the park.", answer: "The weather was windy, so we ate food in the park carefully.", studentAnswer: "The picnic was windy, so we ate food in the park.", explanationEn: "Windy describes weather, not the picnic itself.", explanationZh: "windy 描述 weather，不直接描述 picnic。", tag: "Collocation" }
    ],
    creativePrompt: "Use five words from today's list to write a short note about whether to keep or cancel a weekend plan.",
    examples: [
      { en: "The forecast says the morning will be cloudy and windy.", zh: "天气预报说明天早上多云并且有风。" },
      { en: "Take an umbrella and a raincoat if the weather looks bad.", zh: "如果天气看起来不好，就带上雨伞和雨衣。" },
      { en: "We did not cancel the picnic because it became sunny later.", zh: "我们没有取消野餐，因为后来天气变晴了。" }
    ]
  }
];

export function getPaper(id: string) {
  return papers.find((paper) => paper.id === id);
}

export function getNextPaperId(id: string) {
  const index = papers.findIndex((paper) => paper.id === id);
  return papers[index + 1]?.id;
}

export function getPreviousPaperId(id: string) {
  const index = papers.findIndex((paper) => paper.id === id);
  return papers[index - 1]?.id;
}
