# Build your own Bitcoin signer

A one-page guide for artists. Read it all the way through before you buy anything.

A SeedSigner is a small device that signs Bitcoin transactions without ever
touching the internet. You build it yourself from ordinary parts for about $50.
The project is free and open source. There is no company, no account to create,
and no one to ask permission from.

## What you are building, in one sentence

A device that holds your secret key only while it is plugged in, signs a
transaction when you approve it, and forgets everything the moment you unplug it.

Your real backup is 12 or 24 ordinary words, written on paper by your own hand.
The device is replaceable. The words are not.

## Parts (about $50)

Buy exactly these. Similar-looking parts often will not work.

1. **Raspberry Pi Zero, version 1.3.** This version has no Wi-Fi and no
   Bluetooth, which is what you want. Order it with the pins already soldered
   on (listed as "with headers") so you never touch a soldering iron.
2. **Waveshare 1.3 inch LCD, 240x240 pixels.** The pixel size matters. Other
   Waveshare screens look identical and are not compatible.
3. **A Pi Zero camera** with the OV5647 sensor (the common 5MP ones work).
4. **A microSD card,** 8GB or larger.
5. **A case.** 3D-printed cases are published free by the project, or you can
   design and paint your own. That part is yours.

## Before you build

- Download the SeedSigner software only from the official site, seedsigner.com,
  and follow their steps to check the file is genuine.
- Use a computer you trust to copy the software onto the microSD card.
- Give yourself an hour, good light, and a clear table.

## Build steps

1. Copy the SeedSigner software onto the microSD card.
2. Insert the card into the Raspberry Pi Zero.
3. Connect the camera's ribbon cable to the Pi. The metal contacts on the cable
   face the board.
4. Press the screen onto the pins. It only fits one way. Push straight down,
   evenly, until it sits flush.
5. Put it in the case.
6. Power it with any ordinary phone charger.

The screen should light up and show the SeedSigner menu. If it stays black,
unplug it, reseat the screen, and check the card.

## First use

1. Choose to create a new seed phrase.
2. Write every word on paper, in order, numbered. Then write them a second
   time and compare the two copies letter by letter.
3. Store the two copies in two different places.
4. Unplug the device. It is now blank, and that is correct.

## The one rule

Never photograph, type, screenshot, email, or store your seed phrase anywhere
digital. A words list that has touched the internet is a words list you should
stop trusting. If it happens, move your Bitcoin to a brand new seed phrase and
retire the old one.

## If something breaks

Nothing is lost. The device stores nothing. Buy new parts, build again, and
enter the same words. This is the reason the device forgets on purpose.

## Learn more

seedsigner.com has the full instructions, the free case designs, and the
printable templates for backing up your words as a QR code on paper.
