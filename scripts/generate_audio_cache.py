import asyncio
from pathlib import Path

import edge_tts


VOICE = "en-US-JennyNeural"
RATE = "-8%"

PAPERS = {
    "001": {
        "reading": "Last Saturday, Anna took a train to visit her cousin. Her journey started early in the morning. When she got to the station, she checked her ticket and walked to platform 3. There were many passengers, and the train was very crowded. Anna had a small suitcase as her luggage, so it was easy to carry. The train had a short delay, but her seat was quite comfortable. In the end, she arrived at her cousin's town at 11:30. She was happy because she didn't miss lunch with her cousin.",
        "words": [
            "journey",
            "delay",
            "platform",
            "luggage",
            "ticket",
            "passenger",
            "comfortable",
            "crowded",
            "arrive",
            "miss",
        ],
    },
    "002": {
        "reading": "Mia's class started a project about the environment. Their teacher asked them to protect their town by changing one daily habit. Mia decided to use less plastic and always carry a bottle from home. Her friend Leo tried to recycle paper and cans. The students also wanted to reduce food waste at lunch. A local shop helped them by putting up posters about pollution. After one month, the class saved water and energy, and they felt proud of their small changes.",
        "words": [
            "environment",
            "recycle",
            "pollution",
            "protect",
            "waste",
            "energy",
            "local",
            "reduce",
            "plastic",
            "habit",
        ],
    },
    "003": {
        "reading": "Lily had a headache and a stomachache on Monday morning, so her mother made an appointment with a doctor. At the clinic, the nurse checked Lily's temperature and asked her to sit with another patient. The doctor said Lily did not need strong medicine, but she should rest and drink warm water. He also gave her advice about sleep, food, and light exercise. Lily wanted to recover quickly, so she followed the doctor's words. After three days, she felt healthy again and went back to school.",
        "words": [
            "appointment",
            "medicine",
            "temperature",
            "headache",
            "stomachache",
            "healthy",
            "exercise",
            "patient",
            "recover",
            "advice",
        ],
    },
}


async def save_audio(text: str, output: Path) -> None:
    if output.exists():
        return

    output.parent.mkdir(parents=True, exist_ok=True)
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(str(output))


async def main() -> None:
    root = Path("public/audio/papers")
    for paper_id, paper in PAPERS.items():
        await save_audio(paper["reading"], root / paper_id / "reading.mp3")
        for word in paper["words"]:
            await save_audio(word, root / paper_id / "words" / f"{word}.mp3")


if __name__ == "__main__":
    asyncio.run(main())
