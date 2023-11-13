# Mars Rover Kata

## Description

This repository contains a simple implementation of the Mars Rover Kata
described on the "kata-Log" website: https://kata-log.rocks/mars-rover-kata

### Main Concepts

In solving the kata, the following concepts have been used and implemented in their own
.ts file:

#### directions

1. Direction type
   The kata defines directions as being: North, South, East or West and this is captured in the
   directions type.

2. Rotation type
   A Rover may turn either Left or Right from its current direction.

This could be considered either a Direction, or a "Pose", concern. In the end, it was implemented
in the "directions.ts" file as it involves the change of direction and allows us to utilize the  
COMPASS_POINTS array for both the Direction type's definition and in the calculation of direction
change whilst at the same time, keeping it private.

#### poses

> A "pose" represents both the position of something and the direction it is facing.

While developing a solution for the kata, it became annoying constantly talking about a Rover
having "...a position and orientation". Googling unearthed the word "pose", which is a tad
pretentious; but: hey, hum!

#### plateau

The Plateau is currently implemented in very few lines of code. Rather than using an array,
it was decided to represent it as a collection of Tile objects.

In this way, a single location on the Plateau can be described using multiple Tiles with, as yet,
unknown properties. For example, a location with a ravine running through it might have 3 tiles
associated with it having the content: mountain, ravine, water.

A Rover is able to query the Plateau via a function which, given a location, returns a Tile whose
content is a comma-separated aggregation of multiple tile objects.

#### missions

Missions encompass the notion of both a Mission, and MissionStatus.

1. A Mission is currently composed of a starting Pose plus a string of characters: L, M and R.

2. A MissionStatus represents the object returned by a Rover:

   - abandoned: the rover's starting pose was a location outside of the plateau
   - arrived: the final pose after the rover has exhausted its list of instructions
   - halted: the pose of a Rover who's next move was prevented by a plateau boundary

3. Launching missions

missions.ts has a launch() function which takes 3 arguments:

- the top-right position of the plateau
- a list of tile features (this would eventually represent the "actual", undiscovered plateau features)
- a list of mission objects.

A check is performed to ensure the top-right co-ordinates actually represent the top, right of the plateau.

A plateau is then created, containing all the plateau's features.

Each mission is then executed and an array of each mission's final pose is returned.

#### rovers

The concept of a Rover is included in the missions.ts file rather than as a separate file. At this
point in the implementation, a Rover can be though of as just a stream of "poses" and is represented
as a function in the launch() function's closure.

In the current implementation, a Rover has the concept of "halting" if it encounters the Plateau's
boundary. This wasn't necessary but is covered in more detail in the "Features" section, below.

## Instructions

To test a mission with your own inputs, follow the instructions below:

1. Clone or fork this repo
2. Navigate to the kata's directory and run the command "npm install"
3. Within "src/missions.tests.ts", locate the "launch multiple missions" test and:

   - create a new mission definition along the lines of one of the two existing missions
   - add the mission to the launch() function's mission array,
   - add the destination to the array of expected values (in the same order your mission appears)

4. finally, fire up the tests (npm test src/missions.test.ts) and confirm the test passed!

## Future Development

There are many directions future development could take...

### Features

Although this is a simple kata, there are no end of additional features that could be developed. And, if
you feel the urge, please feel free to contribute to the features list and/or implement them. Here are a
handful of "if only I had the time..." features:

#### Plateau

As implemented, the plateau represents a grid with hard, "no go", edges. A more realistic representation might be
to allow a plateau to behave in a way that models a globe. For example, instead of moving off the plateau, a move
beyond one of its edges would result in a Rover appearing on the plateau's opposite edge.

Given a more globe-like behaviour, a Rover would have no boundaries to contain it. So another feature could be
to allow obstacles of various descriptions that a Rover could react to:

- would a cell, or tile, be mountainous or have a ravine running through it?
- would it be navigable?
- would it contain certain minerals, frozen gases, or ice?
- would it contain **life**?

#### Rovers

Currently a "Rover" has very limited behaviour and is cryout out for an expanded repertoir...

A Rover type could be given a set of distinct function signatures to perform different tasks
in each "move" cycle:

1.  observation function: what abilities would a Rover have to discern the properties of the
    tile it's about to move into?

        - if a Rover wasn't equipped with a light sensor it would not detect a cravass and would be "lost".
        - if it had radar it would detect a mountain range and halt

2.  analysis function: what properties of the Tile it occupies would a rover be able to detect?

    - could it analyse every property of a Tile, or just a subset?
    - if a Rover had no radar but **did** have mineral detection it might move
      onto a mountain range but at least be able to report **why** it's stuck!

3.  instructions function: a function passed to a Rover to determine its next move, eg:

    - the current movement behaviour could be replaced with a function that uses a string of
      instructions to determine the next move

    - implement a "random" movement function that would randomly generate "L", "M" or "R"

4.  obstacle detection: a function passed to a Rover to determine what it should do if the next
    tile is not navigable, eg

        - a "do nothing" function would just halt the Rover, notifying Mission Control it is stuck

        - a "turn left" function would always turn a Rover left if faced with an obstruction, useful
        for mapping obstacles (subsequent rovers would not need equiping with radar or light sensors?)

In support of the features above, a Rover would require access to a global state, ie both the "actual"
and "discovered" plateau. How this global state is represented would depend heavily on whether it is
to be regarded as mutable or not.

#### Mission Control / Rover communication

A useful feature would be to add Mission Control to Rover (and even Rover to Rover) comms while a Rover
is on a mission.

There are many approaches to implementing this, the most common probably being the Pub/Sub or Observer pattern.

#### Mission Control UI

If Rovers were able to "transmit" their progress, it would allow a Mission Control frontend to be developed.

This ought to have, at the minimum, features to perform:

1. Define a plateau

   - this could be an "actual" plateau whose features no Rover has discovered

2. Define a mission

   - a Rover's starting pose
   - it's analysis and observation capabilities,
   - it's instuction generator
   - it's obstacle strategy

3. Include a representation of the features of the plateau as they are "discovered"

4. Report the status of each Rover: is it moving, stuck or lost?

5. With a "central" hub monitoring each Rover's position, it could be possible for
   multiple rovers to be simultaneously with discoveries being shared between them and
   also to avoid collisions.

## Tech Stack

### Frontend

The current kata implementation uses TypeScript and most of the above features would not require
any other packages to be installed.

If a UI were to be implemented additional tooling would be required. This could include could include
one of the currently popular frontend frameworks: React, Svelte, etc. But at a minimum, some sort of packager
would be needed to support transpiling TypeScript and Hot Loading to support development.

### Backend

If this "Mars Rover" implementation was ever to be released into the wild, it would require something to support
it's dynamic nature.

Depending on how the frontend was implemented, this could range from a statically hosted server all the way through
to the app being hosted on AWS or a provider like Vercel.
