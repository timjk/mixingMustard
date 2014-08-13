Launch Cloud
========

Cue SoundCloud clips from your Launchpad

[![Code Climate](https://codeclimate.com/github/SimonHFrost/launch_cloud/badges/gpa.svg)](https://codeclimate.com/github/SimonHFrost/launch_cloud)


Useful tracks numbers
--------

Example tracks
292,293,294,295

Tracks that work well together
6533838,151146412,139133862,153158256

First available tracks I could find
2, 17, 19, 43

My tracks
158851384, 2397001, 97075414, 113919687

When I'm cleaning up
--------
1. Check view/model responsibilites are correct
2. Image/link to soundcloud
3. Global soundcloud client id
5. check property and method naming consistency
6. get rid of trackSet property on trackDetailsModel
7. pass launchpad element to event trigger method
8. consistent whitespace for method calls/definitions
9. don't render in initializer
10. change $(this.el) to this.$el

for future: listen function is managed by backbone and prevents memory leaks
