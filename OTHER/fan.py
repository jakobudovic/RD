#!/usr/bin/env python3

# from pid import PID
import RPi.GPIO as gpio
from gpiozero import Motor
from time import sleep
import sys  # for dynamic printing

TEMP_TARGET = float(44.0)
FAN_PIN = 12   # Pin the fan control is tied to
# DUMMY_PIN = 18 # Any unused pin. Used to setup Motor from gpiozero
# MIN_FAN_SPEED = 80 / 100


def init():
    gpio.cleanup()
    gpio.setmode(gpio.BOARD)
    gpio.setup(FAN_PIN, gpio.OUT)
    temps = []


def grab_temp():
    val = 0
    with open("/sys/class/thermal/thermal_zone0/temp", "r") as file:
        val = int(file.readline()) / 1000
    return val


def start():
    gpio.output(FAN_PIN, False)
    for i in range(45):
        temp = grab_temp()
        sys.stdout.write("\r{0}{1}{2} ".format("|"*i, "-"*(45-i-1), temp))
        sys.stdout.flush()
        sleep(0.2)


def stop():
    gpio.output(FAN_PIN, True)
    for i in range(45):
        temp = grab_temp()
        sys.stdout.write("\r{0}{1} ".format("|"*i, "-"*(45-i-1), temp))
        sys.stdout.flush()
        sleep(0.167)

# Initial loop setup
# fan = Motor(FAN_PIN, DUMMY_PIN)
# fan.forward(cycle)


init()
temps = []
try:
    while True:
        sleep(1)
        temp = grab_temp()
        temps.append(temp)
        print("Average: {}, Target: {}".format(
            round(sum(temps)/len(temps), 1), TEMP_TARGET))
        if temp > TEMP_TARGET:
            print("T: ", temp, "; Too hot! Cooling down...")
            for i in range(4):
                sys.stdout.write("\r{0}".format("."*i))
                sys.stdout.flush()
                sleep(0.167)
            start()
            sys.stdout.flush()
            print("...")
        else:
            print("T: ", temp, "; Cold enough. Stopped.")
            for i in range(4):
                sys.stdout.write("\r{0}".format("."*i))
                sys.stdout.flush()
                sleep(0.167)
            stop()
            sys.stdout.flush()
            print("...")
        print()

# gpio.cleanup()

except KeyboardInterrupt:
    stop()
    gpio.cleanup()
    print("Keyboard interrupt! Stopping!")
