---
type: post
---
# My "Private Cloud"[^1]

It turns out that just like the big-money consultants have been telling you for years, the future is in "cloud computing". However, with the right DIY attitude and some excellent open-source infrastructure code you too can run your own "private cloud" on a single robust PC and get many of the benefits of a fully-managed IT stack without all the icky oversight, vendor lock-in, or, well, money.

Because I'm an enthusiast and have had some time to kill recently I've finally gotten to invest in my personal infrastructure around this kind of "small-scale cloud computing": i.e., wiring up containers, VMs, network storage, and fast upstream Internet connections to make my personal computing environment look more like the managed servers I've worked with in recent years.

<div style="float: right">

![logos](/images/private-cloud-logos.png)

</div>

At present, that means I've tied together a few foundational bits of tech:

* OpenSSH w/public key auth
* Btrfs + Duperemove + Snazzer
* Qemu + KVM + SystemD
* VS Code remote development extension and/or sshcode

There are a fair number of moving pieces here. At the lowest level, I have a big old tower PC running Clear Linux and qemu/kvm for guest virtual machines. (Why Clear? It's fast, self-updating, and designed to make local config tweaks safe and easy to apply and revert if you break stuff.) Systemd starts some of those VMs automatically after boot, so my "dev" and "database" boxes are always just an ssh connection away.

In the background, that host machine is storing all the VM disk images in btrfs and using [duperemove](https://github.com/markfasheh/duperemove) to lazily reclaim storage from duplicated blocks and [snazzer](https://github.com/csirac2/snazzer) to keep snapshots. Another machine (this one a modest little ARM SBC running Raspbian) pulls those snapshots and stuffs them in yet another de-duped btrfs volume, alongside the git repos and other archival storage I maintain.

I can "fork" a virtual machine by copying its disk image to a new path, cloning a template shell script which sets e.g. memory + CPU parameters and disk paths, and optionally adding a systemd entry to auto-start it as needed. Behind the scenes my storage is getting fairly efficiently de-duped and snapshotted, all without any coordination or awareness of that fact by the guest VMs.

![disk usage](/images/df.png "23G used for ~100G of virtual disk")

(this is roughly 100GB of disk de-duped across the running VMs)

Right now, that means I'm using 6GB of RAM and about 25GB of disk to run the host OS and a couple of fairly beefy (8GB RAM + 4-core virtual CPU) build + database guests with the system idling at about 5% CPU usage during a full background network filesystem sync. When I'm compiling, installing software, or running some giant query that VM can hit very high CPU utilization but its RAM usage gets capped by qemu+kvm and Linux is generally pretty happy IME when CPU-starved but healthy w.r.t. RAM and disk-I/O capacity.[^2]

The host machine has 32GB of RAM and a couple of terabytes of storage, but it was built as a gaming machine, not a server. Checkpointing and forking VMs is a useful defense for me against arbitrary shutdowns, bad OS upgrades, etc., and makes it trivial to do things like testing out some random self-hosted server package that wants to spew startup scripts and configuration all over my system disk.

Once a VM is running, VS Code will happily connect to it via SSH and give me basically the same dev experience as in any local Linux environment. (I can also use WSL for local hacking when away from my fast home network, though the performance hit of running WSL1 and impedence mismatch of Ubuntu vs. Clear makes it less and less appealing as I get better at the managed VM environment.)

![remote](/images/remote-editor.png)

The [sshcode](https://github.com/cdr/sshcode) project gives me the ability to tunnel directly to the devbox from an arbitrary host, too, so when I'm stuck with my iPad or some broken old laptop as my only client to connect from I can still get stuff done.

On the downside, this makes the machines kind of "pets" in the classic ops "cattle, not pets" sense. _Yes_ I can re-build the image if I want to, but I haven't (yet) scripted the provisioning. _(Hello, Packer. We'll play again soon.)_

Then it's pushing the disk images and job defs into something like k3os or a baby Nomad cluster to make the host they're running on transparent to the requesting client. Then I can plug the old Xeon server in my closet into the local Ethernet and spin it up when I want to migrate some of my workload over there during hours when the noise of the server's fans won't keep anyone awake.

One other TODO is getting wireguard re-installed on all the relevant machines. Right now the main host PC is basically a central hub for all these services, so getting to arbitrary high-numbered TCP ports there is a necessity to actually interact with the running services. Wiring everything into a userspace VPN will let the kinds of workload migrations I want to do possible, as well as overlaying a virtual IP space that will better support my roaming on and off my home network.

To be honest I don't think I've ever had a setup I found quite this nice at work. It's admitedly an easier problem to solve when I can trust myself with root on every relevant box (even if almost everything I do day-to-day is running in a relatively isolated VM unable to touch other guests) vs. being just one member of a large, not-entirely-trusted (for good reason!) dev team.

Furthermore, the manual steps of e.g. provisioning obviously wouldn't scale to lots of people and hosts coming and going on the fly. How nice for me that I don't have to onboard new people to my private computing environment all that often.[^3]

For the time being, though, it gives me a good slice of the capabilities of something like a fancy VMWare cluster setup or AWS WorkSpaces without shelling out $$$ for anything other than commodity Linux boxes with fast NICs and lots of cheap, unrealizble SSD storage.

[^1]: I'm writing this partially to fill some gaps in the story I told in my ["text is important"](/ideas/text-1.md) post around how I keep certain "working sets" of information close-at-hand without sprawling across and endless sea of directories and mutually-incompatible (or at least orthogonal) working environments. It doesn't include much code per se, though I have a "housekeeping" repo where I've been stashing relevant snippets in that might be worth sharing some day.

[^2]: Raw disk images atop btrfs actually appear to benchmark pretty close to native ext4 on these machines' old SATA SSDs, so virtualized I/O isn't really a bottleneck. Even oversubscribed w.r.t. RAM, the host has yet to get anywhere near swap in my use so far, presumably because each client VM acts under its own perceived memory pressure to prune disk cache and take any other memory-saving measures available to it. Or KVM is doing some magic page de-duping under the hood. Either way, it works well for me thus far and I'm not really motivated to crack the hood and see what's going on underneath in too much depth just yet.

[^3]: If my wife wanted a personal VM, or I wanted a safe environment for guests to grab a spare tablet or laptop and do some email, though, I'd be _set_. Just waiting for that urgent support ticket to come in any day now. And yes, Packer I still remember you sitting over there, even though you're being quiet and staring at your phone. And now I see you brought your friend Vault. Cool, we'll get that campaign set up soon. I'm gonna play a dwarven sysadmin.