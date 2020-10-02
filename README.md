**Description**

This is a react native project that interacts with a server for registering participants to various events listed.This was an excercise in learning and as such may not be useful to many. I am part of a group that organizes biennial events where all group members meet at some resort and spend  one or two days together. This effort requires registering participants, and arranging for their pick up to and from their point of entry, manging resort reservations etc. This app is used for that purpose. 

**Server functionalities**

Server allows the following actions and responds with JSON data

1.  Register a user
2.  Login registered users
3.  Register for listed events
4.  View media related to events
5.  Download media with progress indicator
6.  Upload multiple media files with progress indicator

**API Calls**

Root URL: http://ec2-65-0-61-175.ap-south-1.compute.amazonaws.com:8000/events

1.  New User: [Root URL]/register
2.  Login   : [Root URL]/login
3.  Register: [Root URL]/create
4.  View Media: [Root URL]/display
5.  Upload Media: [Root URL]/upload

