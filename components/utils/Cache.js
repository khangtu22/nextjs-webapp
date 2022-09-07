import {InMemoryCache, makeVar} from "@apollo/client";
import {relayStylePagination} from "@apollo/client/utilities";

export const Cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                meCache: {
                    read() {
                        return meVar();
                    }
                },
                chatRooms: {
                    read() {
                        return chatRoomVar();
                    }
                },
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                },
                navigationPosition: {
                    read() {
                        return navigationPositionVar();
                    }
                },
                meCached: {
                    read() {
                        return meVar();
                    }
                },
                actionSetting: {
                    read() {
                        return actionSettingVar();
                    }
                },
                isPopupFollowerOpen: {
                    read() {
                        return isPopupFollowerOpenVar();
                    }
                },
                isPopupFollowingOpen: {
                    read() {
                        return isPopupFollowingOpenVar();
                    }
                },
                isPopupSinglePostOpen: {
                    read() {
                        return isPopupSinglePostOpenVar();
                    }
                },
                isChildModalOfModalOpen: {
                    read() {
                        return isChildModalOfModalOpenVar();
                    }
                },
                isChatMessagePopupOpen: {
                    read() {
                        return isChatMessagePopupOpenVar();
                    }
                },
                setSenderAndReceiver: {
                    read() {
                        return setSenderAndReceiverVar();
                    }
                },
                isSubPopupOpen: {
                    read() {
                        return isSubPopupOpen();
                    }
                },
                chatsMessages: {
                    keyArgs: ["id"],
                    read() {
                        return chatsMessages();
                    }
                },
                chatsMessagesSession: {
                    keyArgs: ["id"],
                    read() {
                        return chatsMessagesSession();
                    }
                },
                postsComments: {
                    read() {
                        return postsComments();
                    }
                },
                commentsByPostId: relayStylePagination(["postID"]),
                postsByListUserId: relayStylePagination(["ids"]),
                postsByUserId: relayStylePagination(["id"]),
                posts: relayStylePagination(["first"]),
                users: relayStylePagination(["first"]),
                checkHowManyFollowers: relayStylePagination(["userFollowing"]),
                checkHowManyFollowing: relayStylePagination(["user"]),
                likesByPostId: relayStylePagination(["postID"]),
                checkSavedPost: {
                    keyArgs: ["userID", "postID"],
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                // likesByPostId: {
                //     keyArgs: ["postID"],
                //     merge(existing, incoming, {mergeObjects}) {
                //         return incoming;
                //     },
                // },
                // checkLiked: {
                //     keyArgs: ["userID", "postID"],
                //     merge(existing, incoming, {mergeObjects}) {
                //         return incoming;
                //     },
                // },
                // checkFollowingRelationships: {
                //     keyArgs: ["user", "userFollowing"],
                //     merge(existing, incoming, {mergeObjects}) {
                //         return incoming;
                //     },
                // },
                // checkSavedPost: {
                //     keyArgs: ["user", "postID"],
                //     merge(existing, incoming, {mergeObjects}) {
                //         return incoming;
                //     },
                // },
                // commentLikesByCommentId: {
                //     keyArgs: ["commentID"],
                //     merge(existing, incoming, {mergeObjects}) {
                //         return incoming;
                //     },
                // }
            }
        },
        OnNewChatMessage: {
            keyFields: ["chat", ["id"], "user", ["id"], "text"],
        }
    },

});
// Initializes to true if localStorage includes a 'token' key,
// false otherwise

export const isLoggedInVar = process.browser ? makeVar(!!localStorage.getItem("token")) : null;
export const actionSettingVar = makeVar("editProfile");
export const navigationPositionVar = makeVar(null);
export const isPopupFollowerOpenVar = makeVar(false);
export const isPopupFollowingOpenVar = makeVar(false);
export const isPopupSinglePostOpenVar = makeVar(false);
export const isSubPopupOpen = makeVar(false);
export const isChatMessagePopupOpenVar = makeVar(false);
export const isChildModalOfModalOpenVar = makeVar(false);
export const setSenderAndReceiverVar = makeVar({
    sender: null,
    receiver: null
});

export const chatsMessages = makeVar([]);
export const chatsMessagesSession = makeVar([]);
export const postsComments = makeVar([]);


export const postsVar = makeVar([100, 101, 102]);

export const meVar = makeVar({});
export const chatRoomVar = makeVar([]);
