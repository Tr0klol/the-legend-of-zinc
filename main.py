serial.write_line("time_ms,temp,gas,soil,light,uv,risk")
while True:
    time_ms = control.millis() / 1000
    temp = pins.analog_read_pin(AnalogPin.P0) / 10
    soil = pins.analog_read_pin(AnalogPin.P1)
    gas = pins.digital_read_pin(DigitalPin.P2)
    light_val = pins.analog_read_pin(AnalogPin.P3)
    uv = pins.analog_read_pin(AnalogPin.P4)
    risk = 0
    if temp < 400:
        risk += 0
    elif temp < 600:
        risk += 10
    elif temp < 800:
        risk += 20
    else:
        risk += 30
    if soil < 200:
        risk += 25
    elif soil < 400:
        risk += 15
    elif soil < 600:
        risk += 5
    if gas == 1:
        risk += 25
    elif gas == 0:
        risk += 15
    if light_val > 900:
        risk += 10
    elif light_val > 700:
        risk += 5
    if uv > 900:
        risk += 10
    elif uv > 700:
        risk += 5
    line = "" + str(time_ms) + "," + ("" + str(temp)) + "," + ("" + str(soil)) + "," + ("" + str(gas)) + "," + ("" + str(light_val)) + "," + ("" + str(uv)) + "," + ("" + str(risk))
    serial.write_line(line)
    if risk >= 60:
        basic.show_icon(IconNames.ANGRY)
    elif risk >= 30:
        basic.show_icon(IconNames.CONFUSED)
    else:
        basic.show_icon(IconNames.HEART)
    if risk >= 80:
        music.play(music.tone_playable(440, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    elif risk >= 60:
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    basic.pause(2000)