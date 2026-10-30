# Class 04 slides: SeedSigner (draft, not announced)

Internal draft for the "Protecting Your Savings: Security and Self-Custody" class,
Monday, December 14, 2026. These slides are for Dion to learn from and rehearse.
Do not add them to the public class deck, the website, or any announcement until
Dion has built a SeedSigner himself and is confident teaching it.

Tone: plain language. Most of the room is new to Bitcoin. Define every term the
first time it appears. Never oversell. SeedSigner is one good tool, not the only one.

Brand colors if these move into Google Slides: orange #FF4F14, cream #FFFAF0,
neon #B3FF48, black. Never put neon on cream or cream on neon.

---

## Slide 1. Title

**Your keys, your art, your money**

A hands-on look at holding your own Bitcoin with a device you build yourself.

Speaker note: "Today we go from understanding self-custody to actually doing it.
Everything we use today is open source, costs under $50, and you can build it
at your kitchen table."

## Slide 2. The one idea

Whoever holds the keys controls the Bitcoin.

A key is a long secret number. It is written down as 12 or 24 ordinary words,
called a seed phrase. Anyone who has those words can move the Bitcoin. Anyone
who does not, cannot. Not a bank, not us, not the person who built the device.

Speaker note: "This is the whole class. Everything else is just how you keep
those words safe."

## Slide 3. Three ways people hold Bitcoin

1. **On an exchange.** Someone else's computer holds your keys. Convenient, and
   you are trusting them completely. Exchanges have failed and taken people's
   money with them.
2. **In a phone app.** Your phone holds the keys. Better, but phones get lost,
   stolen, and hacked, and they are online all day.
3. **On your own signing device, with the words backed up offline.** You hold
   the keys. More responsibility, and nobody else can lose them for you.

There is no perfect option. There is only a trade: convenience against control.
Artists who are paid in Bitcoin should learn option 3 before the amounts get big.

## Slide 4. What "air-gapped" means

Air-gapped means the device never connects to the internet. No Wi-Fi, no
Bluetooth, no cable to your computer.

It talks to your phone or computer through the camera, using QR codes. Your
phone says "please sign this," the device signs it, and hands back a QR code.
The secret words never leave the device.

Speaker note: "Think of it like signing a paper check. The check travels. Your
signature stamp stays home."

## Slide 5. What SeedSigner is

SeedSigner is free, open-source software that turns about $50 of ordinary parts
into an air-gapped signing device.

- **Open source:** anyone can read the code. Nothing is hidden.
- **Stateless:** it remembers your seed phrase only while it is powered on.
  Unplug it and the memory is wiped. Your real backup is the words, written
  down, not the device.
- **DIY:** you buy the parts and build it. There is no company behind it, so
  there is nobody to call, and nobody who can shut it down.

Speaker note: "Because there is no company, nobody sponsors this class and
nobody profits from it. We teach it because it is honest and cheap."

## Slide 6. The parts (about $50)

- Raspberry Pi Zero, version 1.3 (the one with no Wi-Fi)
- Waveshare 1.3 inch LCD, the 240x240 model only
- A small Pi Zero camera
- A microSD card
- A case

Show a photo of the finished device here.

Speaker note: "Version 1.3 matters because it physically cannot connect to a
network. And the screen must be the 240x240 model. Other Waveshare screens
look identical and will not work."

## Slide 7. Why this suits artists

- **You can build it.** No permission, no account, no waiting list.
- **You can make it yours.** The case is just plastic. Artists design and paint
  their own. Your wallet becomes a piece of your work.
- **You can verify it.** You do not have to trust a factory in another country.
  You watched every piece go together.
- **You can teach it.** Once you have built one, you can show another artist.

## Slide 8. What we will NOT do in this class

- We will not move real Bitcoin today.
- We will not photograph, type, or say anyone's seed phrase out loud. Ever.
- We will not store seed phrases in photos, email, notes apps, or password
  managers.

Speaker note: "If you only remember one safety rule, remember the second one.
A seed phrase that has been on a screen is a seed phrase you should stop
trusting."

## Slide 9. How a transaction actually happens

1. Your wallet app builds the transaction and shows a QR code.
2. SeedSigner's camera reads it.
3. You check the amount and the destination address on the SeedSigner's own
   screen. This is the moment that matters.
4. You approve it. The device signs.
5. It shows a new QR code. Your phone's camera reads it, and the transaction
   is broadcast.

The words never touch the phone.

## Slide 10. The backup is the point

The device is replaceable. The words are not.

- Write the seed phrase on paper, by hand.
- Make a second copy.
- Store the copies in two different places.
- Never store them anywhere digital.
- Consider stamping them into metal if the amount grows. Paper burns and gets wet.

If the device breaks, you buy $50 of parts, build another, and enter the same
words. Nothing was lost, because nothing was ever stored in the device.

## Slide 11. Practice, then small amounts

- Build the device and practice with a tiny amount first.
- Send a small payment to yourself and confirm you can recover it.
- Only then receive larger payments from collectors or clients.
- Write down your own steps while you do it. Teaching it later is how you
  know you understand it.

## Slide 12. Where to go next

- Build guide: the one-page sheet from this class
- Official project: seedsigner.com
- Questions: bring them to the next session, or write them down for the
  follow-up

Speaker note, internal only: do not promise a guest, a build workshop, or
hardware giveaways. None of that is confirmed.

## Slide 13. Close

You do not need permission to hold your own money.

Build the device. Write down the words. Keep them offline. Make the case
yours.

---

## Rehearsal checklist for Dion (not a slide)

- [ ] Build one complete SeedSigner, start to finish, alone.
- [ ] Create a seed phrase on it and write it down.
- [ ] Power it off, power it on, and restore from the words.
- [ ] Sign one small test transaction and confirm it.
- [ ] Wipe it and confirm the words are gone from the device.
- [ ] Time yourself. The live demo should fit in 15 minutes.
- [ ] Only after all six: decide whether this goes into the December 14 class.
