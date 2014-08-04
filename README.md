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

 - cancel
 - plugin into cookie to save progress



 - extend all from the same base class that gives getOptions(), setUserOptions() - add to each constructor tutorConfig and {} for the options.
 -  When show or hide is called, the thing calling will use box.getOptions() which will merge the provided options with default options, or with user options and those provided to getOptions