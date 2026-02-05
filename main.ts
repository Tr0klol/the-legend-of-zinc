let time_ms: number;
let temp: number;
let soil: number;
let gas: number;
let light_val: number;
let uv: number;
let risk: number;
let line: string;
serial.writeLine("time_ms,temp,gas,soil,light,uv,risk")
while (true) {
    time_ms = control.millis() / 1000
    temp = pins.analogReadPin(AnalogPin.P0) / 10
    soil = pins.analogReadPin(AnalogPin.P1)
    gas = pins.digitalReadPin(DigitalPin.P2)
    light_val = pins.analogReadPin(AnalogPin.P3)
    uv = pins.analogReadPin(AnalogPin.P4)
    risk = 0
    if (temp < 400) {
        risk += 0
    } else if (temp < 600) {
        risk += 10
    } else if (temp < 800) {
        risk += 20
    } else {
        risk += 30
    }
    
    if (soil < 200) {
        risk += 25
    } else if (soil < 400) {
        risk += 15
    } else if (soil < 600) {
        risk += 5
    }
    
    if (gas == 1) {
        risk += 25
    } else if (gas == 0) {
        risk += 15
    }
    
    if (light_val > 900) {
        risk += 10
    } else if (light_val > 700) {
        risk += 5
    }
    
    if (uv > 900) {
        risk += 10
    } else if (uv > 700) {
        risk += 5
    }
    
    line = "" + ("" + time_ms) + "," + ("" + ("" + temp)) + "," + ("" + ("" + soil)) + "," + ("" + ("" + gas)) + "," + ("" + ("" + light_val)) + "," + ("" + ("" + uv)) + "," + ("" + ("" + risk))
    serial.writeLine(line)
    if (risk >= 60) {
        basic.showIcon(IconNames.Angry)
    } else if (risk >= 30) {
        basic.showIcon(IconNames.Confused)
    } else {
        basic.showIcon(IconNames.Heart)
    }
    
    if (risk >= 80) {
        music.play(music.tonePlayable(440, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else if (risk >= 60) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    
    basic.pause(2000)
}
