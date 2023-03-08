import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

async function playSound() {
    try {
        await soundObject.loadAsync(require("../assets/soundEffect.mp3"));
        await soundObject.playAsync();
    } catch (error) {
        console.log(error);
    }
}

export default playSound;
