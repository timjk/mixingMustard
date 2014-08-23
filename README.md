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

Notes
--------

consistency for event names and functions
pass squareModel to trackDetails instead of maintaining duplicate model
show time for position slider
is the device always 0? See if you can refer to a device by it's name
make more const, especially when it's referenced multiple places
speed initial load by making midi initialization load async
select first square on initialization

for future: use listen function instead of on because it's managed by backbone and prevents memory leaks
