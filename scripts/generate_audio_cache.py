import asyncio
import base64
import subprocess
import tempfile
from pathlib import Path

import edge_tts
import imageio_ffmpeg
from aiohttp.client_exceptions import ClientError


VOICE = "en-US-JennyNeural"
RATE = "-8%"
edge_available = True

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
    "004": {
        "reading": "Nina wanted to improve her English before an important exam. Her favourite subject was science, but English felt difficult. Her teacher asked her to join a short course after school and practise reading for twenty minutes every day. Nina did her homework carefully and wrote down each mistake in a small notebook. When she did not understand a sentence, she asked the teacher to explain it again. At the end of the month, Nina's mark was higher, and her result made her feel proud.",
        "words": [
            "subject",
            "improve",
            "exam",
            "mark",
            "explain",
            "practise",
            "mistake",
            "course",
            "result",
            "homework",
        ],
    },
    "005": {
        "reading": "Amy went to a small cafe with her father after school. A friendly customer was asking about the price of a sandwich. Amy looked at the menu and wanted to choose something fresh. The fruit salad was cheap, but the pasta was more expensive. Her father had a discount card, so they could save some money. Amy decided to order the fruit salad and a bottle of water. After they paid, the waiter gave them a receipt. Amy learned to check the price before buying food.",
        "words": [
            "customer",
            "receipt",
            "price",
            "discount",
            "fresh",
            "order",
            "menu",
            "choose",
            "expensive",
            "cheap",
        ],
    },
    "006": {
        "reading": "Tom wanted a weekend job at the town library, so he went there for an interview. The manager was friendly, but she had a busy morning and asked Tom to wait before their meeting. Tom did not feel bored because he looked at posters for a reading activity. One poster invited students to volunteer on Saturdays. Tom said reading was his hobby, and helping younger children sounded exciting. After the meeting, the manager told Tom he could start next week. Tom was happy because the job matched his free time.",
        "words": [
            "interview",
            "manager",
            "meeting",
            "busy",
            "boring",
            "exciting",
            "hobby",
            "activity",
            "volunteer",
            "job",
        ],
    },
    "007": {
        "reading": "Grace used her tablet for homework every evening. One day, the screen went dark, and she could not read an online message from her teacher. Grace thought the device had a serious problem, but her brother checked it calmly. He said the battery was empty and helped her charge it. After ten minutes, the tablet worked again. Grace was happy because the repair was simple and did not cost money. She learned that a useful device still needs care, and she promised to charge it before studying.",
        "words": [
            "repair",
            "screen",
            "device",
            "online",
            "message",
            "battery",
            "charge",
            "useful",
            "simple",
            "problem",
        ],
    },
    "008": {
        "reading": "On Saturday, Ben's football team went to a small stadium for an important match. Their coach told every player to warm up carefully and listen to each other. The match was part of a school competition, so many families came to watch. Ben's team did not start well and nearly lost the first half. During the break, the coach asked them to stay calm and train their minds, not only their bodies. In the second half, Ben scored the last goal, and his team won the game. They did not win a big prize, but they felt proud because they worked together.",
        "words": [
            "match",
            "team",
            "coach",
            "player",
            "competition",
            "stadium",
            "train",
            "win",
            "lose",
            "prize",
        ],
    },
    "009": {
        "reading": "Emma and her friends planned a picnic in the park on Sunday. On Saturday evening, Emma checked the weather forecast because the sky looked cloudy. The forecast said Sunday morning would be windy, but the afternoon might be sunny. Emma packed an umbrella and a raincoat just in case. On Sunday, a short storm came before lunch, so the friends waited at home. They did not cancel the picnic because the sun came out later. In the afternoon, the weather was warm and bright, and everyone enjoyed their food under the trees.",
        "words": [
            "weather",
            "forecast",
            "umbrella",
            "raincoat",
            "cloudy",
            "sunny",
            "windy",
            "storm",
            "picnic",
            "cancel",
        ],
    },
    "010": {
        "reading": "Leo was visiting a new city and did not know which direction to take to the science museum. A woman at a nearby cafe told him to walk along the pavement until he reached the corner. The traffic was busy, so Leo used the crossing carefully. He then walked over a small bridge and saw the museum opposite a library. At first, he went to the wrong entrance, where a guard showed him the correct one. After his visit, Leo left through the exit beside the gift shop. He was pleased because he could now find his way around the area.",
        "words": [
            "direction",
            "entrance",
            "exit",
            "bridge",
            "traffic",
            "pavement",
            "nearby",
            "corner",
            "crossing",
            "opposite",
        ],
    },
    "011": {
        "reading": "Sophie was nervous about singing at the school show. Her aunt and uncle came early to support her, and another relative brought her a small card. Before the show, Sophie became upset because she forgot one line of the song. Her uncle told her not to argue with herself and reminded her to trust her preparation. Her aunt stayed cheerful and practised the difficult line with her. Sophie sang well and felt grateful for her family's help. After the show, everyone celebrated together, and Sophie understood that kind support can make a difficult moment easier.",
        "words": [
            "relative",
            "aunt",
            "uncle",
            "cheerful",
            "nervous",
            "upset",
            "grateful",
            "argue",
            "support",
            "trust",
        ],
    },
    "012": {
        "reading": "Ella needed smart clothes for a family celebration. At a shop, she first tried a blue sweater with a black skirt, but the sweater was the wrong size. Next, she put on a short jacket and a pair of trousers. They fit her well and looked smart without being too formal. The jacket also had a useful pocket for her phone. Ella usually preferred casual clothes, so she was pleased that the outfit felt comfortable. Before leaving, she bought warm gloves for the cold evening. She chose the jacket and trousers because they looked good and were easy to wear.",
        "words": [
            "jacket",
            "sweater",
            "trousers",
            "skirt",
            "gloves",
            "pocket",
            "size",
            "fit",
            "smart",
            "casual",
        ],
    },
    "013": {
        "reading": "Noah's Saturday chore was to help clean the flat before his grandparents arrived. He began by putting books back on the shelf and clothes in the cupboard to make his room tidy. Then he used a cloth to dust the desk and sweep the kitchen floor. His sister loaded the dishwasher while their father started the laundry. Noah wanted to vacuum the living room, but the machine was broken. He went next door to borrow one from a neighbour. Working together made every chore quicker, and the family finished before lunch. Noah felt pleased when the flat looked clean and welcoming.",
        "words": [
            "chore",
            "tidy",
            "sweep",
            "dust",
            "laundry",
            "dishwasher",
            "vacuum",
            "shelf",
            "cupboard",
            "borrow",
        ],
    },
    "014": {
        "reading": "Liam's school held a concert on Friday evening. He walked onto the stage with his guitar and felt nervous when he saw the large audience. His music teacher, a professional musician, reminded him to listen to the rhythm and enjoy the melody. The guitar was Liam's favourite instrument, and he had practised for weeks. When it was time to perform, he took a slow breath and began to play. At the end of the song, everyone started to clap. Liam smiled because the concert had gone well, and he was proud that he had stayed calm on stage.",
        "words": [
            "concert",
            "stage",
            "audience",
            "instrument",
            "guitar",
            "musician",
            "perform",
            "clap",
            "rhythm",
            "melody",
        ],
    },
    "015": {
        "reading": "Emma's family were travelling abroad for the first time. They used an airline website to reserve their seats and accommodation near the beach. On the morning of their departure, they arrived at the airport early. Emma checked that her passport was safely in her bag. After receiving her boarding pass, she looked at the departure screen to find the correct gate. Their destination was Lisbon, a city Emma had always wanted to visit. When they arrived, a friendly tourist helped the family read a map. Emma felt excited because the holiday had begun smoothly.",
        "words": [
            "airline",
            "airport",
            "passport",
            "boarding",
            "departure",
            "destination",
            "abroad",
            "reserve",
            "accommodation",
            "tourist",
        ],
    },
    "016": {
        "reading": "Oliver spent the weekend with his aunt in the countryside. On Saturday morning, they followed a narrow path into a quiet forest. They climbed a small hill and saw a high mountain beyond the green valley. Oliver stopped several times to photograph the beautiful scenery. His aunt showed him signs of local wildlife, including a fox's footprints near a stream. The area felt peaceful because there were no cars or crowds. After lunch, they decided to explore another path beside the trees. Oliver returned home tired but happy and wanted to visit the countryside again.",
        "words": [
            "countryside",
            "forest",
            "mountain",
            "valley",
            "path",
            "hill",
            "wildlife",
            "scenery",
            "peaceful",
            "explore",
        ],
    },
    "017": {
        "reading": "On Tuesday, Mei visited the town library to find a book for her reading club. A librarian recommended a novel by a local author. Mei read the first chapter and liked the story, although she usually chose science books instead of fiction. She also picked up a magazine and found an article about how books are made. For her school project, she checked a reference book for facts about printing. The librarian explained that the local author hoped to publish another novel next year. Mei took the novel home and planned to recommend it to her friends after she had finished it.",
        "words": [
            "novel",
            "author",
            "chapter",
            "recommend",
            "fiction",
            "magazine",
            "article",
            "librarian",
            "reference",
            "publish",
        ],
    },
    "018": {
        "reading": "Rosa's class visited a small gallery to see a collection of work by young artists. Her favourite exhibit was a colourful painting of the sea. Near it stood a sculpture made from old metal objects. A student artist explained how she had made the sculpture. Rosa also noticed a portrait of the artist's grandfather and a quick pencil sketch beside it. The sketch showed the first idea for the portrait. At the end of the visit, the class helped design a poster to display their own work at school. Rosa wanted to return to the gallery with her family.",
        "words": [
            "exhibit",
            "painting",
            "sculpture",
            "artist",
            "gallery",
            "portrait",
            "sketch",
            "design",
            "display",
            "collection",
        ],
    },
    "019": {
        "reading": "Every autumn, Lina's town holds a small food festival. This year, her class received an invitation to help at the opening ceremony. They had a week to prepare. On Friday, Lina and her friends decorated the hall with paper flowers and welcomed each guest at the door. Lina's family has a tradition of making apple cakes for the festival, so she brought some to share. After the ceremony, everyone celebrated with music and food. Lina gave her teacher a small gift: a card signed by the whole class. The teacher smiled, but the biggest surprise came when the visitors voted Lina's class cake table their favourite. Lina felt proud of the work they had done together.",
        "words": [
            "invitation",
            "ceremony",
            "decorate",
            "guest",
            "celebrate",
            "tradition",
            "festival",
            "gift",
            "surprise",
            "prepare",
        ],
    },
    "020": {
        "reading": "On Wednesday, Maya's class visited a school laboratory. A scientist helped them do an experiment with water and salt. First, the children used simple equipment to measure two cups of water. Then they added salt to one cup and watched the mixture carefully. They wanted to observe what happened when both cups were placed in a warm room. By Friday, the water in each cup had disappeared, but salt remained in one. The class did not discover a new kind of salt. Instead, they found evidence that the salt had not disappeared with the water. Maya wrote down the result and decided to do more research about how water changes into gas.",
        "words": [
            "scientist",
            "experiment",
            "laboratory",
            "discover",
            "observe",
            "measure",
            "mixture",
            "evidence",
            "research",
            "equipment",
        ],
    },
    "021": {
        "reading": "On Saturday, Ben followed his aunt's recipe for an apple cake. He checked every ingredient before starting: apples, flour, eggs and a little sugar. His aunt warmed the oven while Ben washed the fruit. He cut the apples into thin slices and put each slice in a bowl. Next, he stirred the eggs into the flour and added the apples. The cake needed to bake for thirty minutes. The warm apple flavour filled the kitchen, but Ben waited until the cake had cooled before taking a taste. He cut one portion for his aunt and another for himself. That evening, they served the rest of the cake to their neighbours. Everyone asked Ben to write down the recipe.",
        "words": [
            "recipe",
            "ingredient",
            "oven",
            "bake",
            "slice",
            "stir",
            "flavour",
            "taste",
            "portion",
            "serve",
        ],
    },
}


async def save_audio(text: str, output: Path) -> None:
    global edge_available

    if output.exists():
        return

    output.parent.mkdir(parents=True, exist_ok=True)
    if edge_available:
        try:
            communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
            await communicate.save(str(output))
            return
        except (ClientError, edge_tts.exceptions.NoAudioReceived):
            edge_available = False
            output.unlink(missing_ok=True)

    await asyncio.to_thread(save_windows_audio, text, output)


def save_windows_audio(text: str, output: Path) -> None:
    with tempfile.TemporaryDirectory() as temp_dir:
        wav_path = Path(temp_dir) / "speech.wav"
        escaped_text = text.replace("'", "''")
        escaped_path = str(wav_path).replace("'", "''")
        script = (
            "Add-Type -AssemblyName System.Speech; "
            "$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
            "$speaker.SelectVoice('Microsoft Zira Desktop'); "
            "$speaker.Rate = -1; "
            f"$speaker.SetOutputToWaveFile('{escaped_path}'); "
            f"$speaker.Speak('{escaped_text}'); "
            "$speaker.Dispose();"
        )
        encoded = base64.b64encode(script.encode("utf-16le")).decode("ascii")
        subprocess.run(
            ["powershell.exe", "-NoProfile", "-EncodedCommand", encoded],
            check=True,
            capture_output=True,
        )
        subprocess.run(
            [
                imageio_ffmpeg.get_ffmpeg_exe(),
                "-y",
                "-loglevel",
                "error",
                "-i",
                str(wav_path),
                "-codec:a",
                "libmp3lame",
                "-q:a",
                "4",
                str(output),
            ],
            check=True,
            capture_output=True,
        )


async def main() -> None:
    root = Path("public/audio/papers")
    for paper_id, paper in PAPERS.items():
        await save_audio(paper["reading"], root / paper_id / "reading.mp3")
        for word in paper["words"]:
            await save_audio(word, root / paper_id / "words" / f"{word}.mp3")


if __name__ == "__main__":
    asyncio.run(main())
