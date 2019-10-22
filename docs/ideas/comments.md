# ideas: comments

## so what about comments?

Comments are hard. I want to do them in a way I think is "right", which means quite a few things. First, users should own their content and be able to remove it or archive it without regard for your site's editorial policy. You don't have to _show_ it in your nice polite thread UI, but the comments still flow in and get recorded; they just age out of the thread cache unless someone bothers to engage.

Second, identity (yeah, also _hard_) should not be tied to my blog or some 3rd-party ad-funded site's comment widget. You create an identity whenever you want, but your posts are strongly authenticated by that identity and your "reputation" (in the form of  replies and flags of your messages) is tied to that key, so getting blocked actually _hurts_ your influence and reach beyond the blocking individual.

I've got the sketch of most of the moving pieces for this. When it's ready, I'll use the backend to do comments here, but with an eye towards data portability and being able to reuse the client-managed identity for other features that will eventually, maybe get added here.