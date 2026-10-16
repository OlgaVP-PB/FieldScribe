# FieldScribe - testing checklist

Thanks for helping break FieldScribe! The goal is to have it solidly tested
before the next field season. Please work through whatever is relevant to how
*you* would use it, and report anything confusing, missing, or wrong - no bug is
too small.

- **Try it:** https://fieldscribe.serve.scilifelab.se/
- **Report to:** olga.pettersson@scilifelab.se, or open an issue at
  https://github.com/OlgaVP-PB/FieldScribe/issues

Please test on the devices you would actually use in the field - ideally a
**phone** and/or **tablet**, plus a **laptop** for preparing and exporting.

## Quick bug-report template

When something is off, a line like this helps a lot:

```
What I did:        (e.g. tapped Export after adding 2 tubes)
What I expected:   (e.g. a CSV download)
What happened:     (e.g. nothing, or an error message "...")
Device / browser:  (e.g. iPhone 13, Safari; or Samsung, Chrome; or Mac, Chrome)
Online or offline: (had signal / airplane mode)
```

A screenshot is gold if you can.

## Install & offline

- [ ] Open the link; the first screen loads with the two paths.
- [ ] Add it to your home screen (iPhone: Share -> Add to Home Screen; Android:
      menu -> Add to Home screen). An icon appears.
- [ ] Open it **once with a connection**, then turn on **airplane mode** and open
      it from the icon - it should still work.
- [ ] Enter a sample offline, then come back online - the data is still there.

## Specimen sampling (organisms)

- [ ] Pick **Specimen sampling**. Fill the shared species / collection block.
- [ ] **GPS:** tap capture GPS. Does the location field fill in for you?
      Is it correct? (It uses the internet; offline you type it.)
- [ ] Add an individual, then add several **tubes** (try 7-9, like a real fish).
- [ ] **Tissue filter:** in a tube, type in the Organism part search box
      ("liver", "gill", "gonad") - does it filter the list? Tick a few.
- [ ] **Barcode scan:** tap the camera button on a tube ID. If it asks for the
      camera, allow it. If it is blocked, do the on-screen steps work?
- [ ] Fill a few individuals/tubes and **Save specimen**. It appears in the list.
- [ ] Edit a saved specimen and re-save - changes stick.
- [ ] **Export:** tap ERGA manifest (CSV + Excel). You get files. Open them -
      do the columns and your values look right? Try the BOLD export too.
- [ ] On a **laptop/tablet**: do the tube fields sit side by side (less scrolling)?

## eDNA / environmental

- [ ] Pick **eDNA / environmental**, choose an environment (e.g. Water, Soil).
- [ ] Capture GPS and fill the on-site fields.
- [ ] **Save with only the on-site fields** filled (leave the desk/lab ones) -
      does it save, and tell you what is still needed?
- [ ] Later, open it and add the desk/lab fields; Export the ENA TSV.
- [ ] Export warns if a sample is still missing required fields.

## Import / preload (laptop)

- [ ] On the first page, tap **Blank template (CSV)** and open it in Excel.
- [ ] Fill a couple of rows (put the **same Specimen ID** on two rows to make
      two tubes of one specimen), save as CSV or Excel.
- [ ] Tap **Import samples** and choose the file - do the specimens appear?
- [ ] Open an imported specimen - are the tubes, tissues and purpose right?

## Data safety

- [ ] **Back up all data** - you get a JSON file.
- [ ] Clear the list (or use another device) and **Restore** from that file -
      your records come back, no duplicates.
- [ ] The home screen shows a reminder when records are not yet backed up.

## Help & orientation

- [ ] The **About & help** panel on the first page is clear and useful.
- [ ] The **camera help** (if the camera is blocked) is easy to follow.

## Things we especially want to hear

- Anything that made you stop and think "what do I do here?"
- Any field or term that was confusing, missing, or wrong for your organisms.
- Anything too fiddly to do with cold/wet/gloved hands in the field.
- Export files that did not drop cleanly into COPO / your pipeline.

Thank you! Your breaking makes it better.
