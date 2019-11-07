---
type: page
sidebar: false
---

# Chapter X

"Okay, here's the deal. You probably don't know this, but it turns out ambient network traffic all up and down the Pacific Rim loop is about 4x what it should be. There are several competing explanations for why, but basically it boils down to two camps: either someone has owned the network and is parasitically running the bulk of all network load (and a commensurate amount of CPU time for message processing along the way) exclusively for their benefit, or our protocols are actually just fucked and we have an ever-growing junky pile of data propagating and amplifying itself across the network to the exclusion of legit, critical packets."[^1]

"Couriers have actually been the biggest backstop against this and a soft proof of the second theory, since areas with better courier network coverage in and out tended to have much lower queue depths and re-send rates overall. Others argued this was a subtle bit of evidence in favor of the 'antagonistic parasite' model, since only the links that weren't subject to constant command-and-control feedback would carry their payload unmolested with any kind of consistent QoS parameters."

I thought for a second about my screaming dispatchers, and opined, "I guess that fits with my anecdotal experience, too. As this route has gotten more trafficked by other couriers there seems to be _less_ slack, not more, in my requested delivery SLAs. I assumed it was competition between us, but if it's actually the network trying to route around damaged communal links and prioritize the ones that work it would logically create the same result."

[^1]: Distributed, append-only logs are a nifty thing to study in CS class, but they're no basis for a system of government. Just ask the maladapted Milleneals still living in their walled compounds around Seattle, San Jose, and Vancouver: they cling to their cryptocurrency ledgers (no matter how slow to commit transactions, and prone to forks that result in brushfire-scale wars between factions supporting each branch of the global state) as the only source of ground truth and demand lengthy exchanges of currency to the local 'coin of choice before allowing entry to their borders in a bizarre, cargo-cult imitation of the airport security theater of the early 21st century.