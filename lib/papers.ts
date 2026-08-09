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
