# tutor

A method for generating tutorial popups for web applications

## What is it?

An idea to help make web applications easier to learn to use. This will show you inline popups based on what page you're on. It needs to:

 - popups need to be marked as understood by either completing their action or tapping ok
 - display multiple popups at once and only progress once they've all been obeyed
 - there can be multiple tutorials
 - the progress can be paused, cancelled, or reset at any time
 - the popups should work on responsive designs

## Next steps

 - Finish doc blocks
 - JS Lint everything
 - Add Travis CI if possible

## Future improvements

 - Tutorial 2 that shows the catfish and importing data from the page
 - Tutorial 3 that shows how it works with tabs

 - Make page scroll to tutorial box if not on display already
 - Add animations object
 - Reposition the boxes on browser resize
 - Stop the boxes overlapping
 - Linked tutorials across pages
 - Easy method to recall current progress and which are complete
 - Allow multiple pause / cancel boxes in the configs so each tutorial can have personalised pause / cancel boxes
 - Force tutorials to cancel from an external trigger
