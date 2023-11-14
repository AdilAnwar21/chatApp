// // var socket = io.connect('http://' + document.domain + ':' + location.port);
// // // var roomName = "{{session['room']}}"
// // var selectedUserId = null;

// // socket.on('connect', function() {
// //     console.log('Connected to Socket.IO server');
// // });

// // socket.on('disconnect', function() {
// //     console.log('Disconnected from Socket.IO server');
// // });

// // socket.on('reconnect', function() {
// //     console.log('Reconnected to Socket.IO server');
// // });

// // socket.on('reconnect_error', function(error) {
// //     console.error('Error reconnecting to Socket.IO server:', error);
// // });

// // socket.on('joined', function (data) {
// //     console.log(data.message);
// // });

// // // socket.on('message', function (data) {
// // //     updateChatContainer(data);
// // // });

// // // function updateChatContainer(data) {
// // //     var chatContainer = document.getElementById('chat-message-container');
// // //     if (chatContainer && data.sender === selectedUserId) {
// // //         var messageType = data.sender === userId ? 'my-message' : 'other-message';

// // //         var listItem = document.createElement('li');
// // //         listItem.className = "clearfix";
// // //         listItem.innerHTML = `
// // //             <div class="message-data ${messageType === 'my-message' ? 'text-right' : 'text-left'}">
// // //                 <span class="message-data-time">${new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
// // //                 <img src="https://bootdey.com/img/Content/avatar/avatar${data.sender}.png" alt="avatar">
// // //             </div>
// // //             <div class="message ${messageType} float-${messageType === 'my-message' ? 'right' : 'left'}">${data.content}</div>
// // //         `;

// // //         chatContainer.appendChild(listItem);
// // //     }
// // // }

// // // function sendMessage() {
// // //     var content = document.getElementById('content').value;
// // //     if (content.trim() !== "") {
// // //         socket.emit('message', { 'selectedUserId': selectedUserId, 'content': content });
// // //         document.getElementById('content').value = "";
// // //         var newMessage = {
// // //             content: content,
// // //             sender: userId,
// // //             time: new Date().toISOString()
// // //         };
// // //         appendMessageToChat(newMessage);
// // //     }
// // // }


// // function sendMessage() {
// //     var content = document.getElementById('content').value;
// //     if (content.trim() !== "") {

// //         //current time
// //         var currentTime = new Date().toISOString();
// //         // Send message to both sender and receiver rooms
// //         socket.send({'selectedUserId': selectedUserId, 'content': content,'time':currentTime });
        

// //         // Add the message to the sender's chat container as a sent message
// //         var newMessageSent = {
// //             content: content,
// //             sender: userId,
// //             time: currentTime,
// //             receiver : selectedUserId
// //         };
// //         // console.log(roomName)
// //         console.log(newMessageSent);
// //         appendMessageToChat(newMessageSent);

// //         document.getElementById('content').value = "";
// //     }
// // }

// // socket.on('message', function (data) {
// //     // Update the chat container for both sender and receiver
    
// //     appendMessageToChat(data);
// //     console.log(data)
// // });






// // function selectUser(userId) {
// //     selectedUserId = userId;

// //     console.log(selectedUserId)
// //     // socket.emit('join', { 'selectedUserId': selectedUserId });
// //     socket.send({ 'selectedUserId': selectedUserId });
// //     // console.log(hero)
// //     document.getElementById('selected-user').innerHTML = document.getElementById('names'+userId).innerHTML;
// //     document.getElementById('receiver-id').src = 'https://bootdey.com/img/Content/avatar/avatar' + userId + '.png';
// //     clearChatContainer();
// //     loadPreviousMessages();

// //     document.getElementById('message-form').style.display = 'block';
// // }

// // function loadPreviousMessages() {
// //     if (selectedUserId) {
// //         var chatContainer = document.getElementById('chat-message-container');
// //         if (chatContainer) {
// //             chatContainer.innerHTML = "";
// //             fetch(`/get_messages/${selectedUserId}`)
// //                 .then(response => response.json())
// //                 .then(data => {
// //                     data.forEach(message => {
// //                         appendMessageToChat(message, true);
// //                     });
// //                 })
// //                 .catch(error => console.error('Error fetching messages:', error));
// //         }
// //         document.getElementById('message-form').style.display = 'block';
// //     } else {
// //         document.getElementById('message-form').style.display = 'none';
// //     }
// // }

// // function appendMessageToChat(message, isOldMessage) {
// //     var chatContainer = document.getElementById('chat-message-container');
// //     if (chatContainer) {
// //         var listItem = document.createElement('li');
// //         listItem.className = "clearfix";
// //         var messageType = message.sender === userId ? 'my-message' : 'other-message';
// //         if (isOldMessage) {
// //             messageType = message.sender === userId ? 'my-message' : 'other-message';
// //         }
// //         listItem.innerHTML = `
// //             <div class="message-data ${messageType === 'my-message' ? 'text-right' : 'text-left'}">
// //                 <span class="message-data-time">${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
// //                 <img src="https://bootdey.com/img/Content/avatar/avatar${message.sender}.png" alt="avatar">
// //             </div>
// //             <div class="message ${messageType} float-${messageType === 'my-message' ? 'right' : 'left'}">${message.content}</div>
// //         `;
// //         chatContainer.appendChild(listItem);
// //     }
// // }

// // function clearChatContainer() {
// //     var chatContainer = document.getElementById('chat-message-container');
// //     if (chatContainer) {
// //         chatContainer.innerHTML = "";
// //     }
// // }

// var socket = io.connect('http://' + document.domain + ':' + location.port);
// var selectedUserId = null;

// socket.on('connect', function() {
//     console.log('Connected to Socket.IO server');
// });

// socket.on('disconnect', function() {
//     console.log('Disconnected from Socket.IO server');
// });

// socket.on('reconnect', function() {
//     console.log('Reconnected to Socket.IO server');
// });

// socket.on('reconnect_error', function(error) {
//     console.error('Error reconnecting to Socket.IO server:', error);
// });

// socket.on('joined', function (data) {
//     console.log(data.message);
// });

// socket.on('load_messages', function (data) {
//     // Update your chat container with the loaded messages
//     var messages = data.messages;
//     messages.forEach(function (message) {
//         appendMessageToChat(message, message.sender == userId ? 'my-message' : 'other-message');
//     });
// });

// // Updated 'handle_message' function
// socket.on('message', function (data) {
//     // appendMessageToChat(message, message.sender === userId ? 'my-message' : 'other-message', true);
//     // Update the chat container for both sender and receiver'
//     console.log(data,"data comes from socket");
//     appendMessageToChat(data);
//     console.log(data);
// });


// function sendMessage() {
//     var content = document.getElementById('content').value;
//     if (content.trim() !== "") {
//         var currentTime = new Date().toISOString();
//         // Send message to both sender and receiver rooms
//         socket.send( { 'selectedUserId': selectedUserId, 'content': content, 'time': currentTime });

//         // Add the message to the sender's chat container as a sent message
//         var newMessageSent = {
//             content: content,
//             sender: userId,
//             time: currentTime,
//             receiver: selectedUserId
//         };
//         console.log(newMessageSent);
//         // appendMessageToChat(newMessageSent);

//         document.getElementById('content').value = "";
//     }
// }




// function selectUser(userId) {
//     selectedUserId = userId;

//     console.log(selectedUserId);

//     // Join the logged-in user to their own room
//     socket.emit('join', { 'selectedUserId': userId });

//     // Update UI elements
//     document.getElementById('selected-user').innerHTML = document.getElementById('names' + userId).innerHTML;
//     document.getElementById('receiver-id').src = 'https://bootdey.com/img/Content/avatar/avatar' + userId + '.png';
//     clearChatContainer();
//     loadPreviousMessages();

//     document.getElementById('message-form').style.display = 'block';
// }

// function loadPreviousMessages() {
//     if (selectedUserId) {
//         var chatContainer = document.getElementById('chat-message-container');
//         if (chatContainer) {
//             chatContainer.innerHTML = "";
//             fetch(`/get_messages/${selectedUserId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     data.forEach(message => {
//                         appendMessageToChat(message, message.sender === userId ? 'my-message' : 'other-message', true);
//                     });
//                 })
//                 .catch(error => console.error('Error fetching messages:', error));
//         }
//         document.getElementById('message-form').style.display = 'block';
//     } else {
//         document.getElementById('message-form').style.display = 'none';
//     }
// }

// function appendMessageToChat(message) {
//     var chatContainer = document.getElementById('chat-message-container');
//     if (chatContainer) {
//         var listItem = document.createElement('li');
//         listItem.className = "clearfix";

//         var messageType = message.sender == userId ? 'my-message' : 'other-message';

//         listItem.innerHTML = `
//             <div class="message-data ${messageType === 'my-message' ? 'text-right' : 'text-left'}">
//                 <span class="message-data-time">${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                 <img src="https://bootdey.com/img/Content/avatar/avatar${message.sender}.png" alt="avatar">
//             </div>
//             <div class="message ${messageType} float-${messageType == 'my-message' ? 'right' : 'left'}">${message.content}</div>
//         `;

//         chatContainer.appendChild(listItem);
//     }
// }




// function clearChatContainer() {
//     var chatContainer = document.getElementById('chat-message-container');
//     if (chatContainer) {
//         chatContainer.innerHTML = "";
//     }
// }



var socket = io.connect('http://' + document.domain + ':' + location.port);
var selectedUserId = null;

socket.on('connect', function () {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Socket.IO server');
});

socket.on('reconnect', function () {
    console.log('Reconnected to Socket.IO server');
});

socket.on('reconnect_error', function (error) {
    console.error('Error reconnecting to Socket.IO server:', error);
});

socket.on('joined', function (data) {
    console.log(data.message);
});

socket.on('load_messages', function (data) {
    // Update your chat container with the loaded messages
    var messages = data.messages;
    messages.forEach(function (message) {
        appendMessageToChat(message, message.sender == userId ? 'my-message' : 'other-message');
    });
});

socket.on('message', function (data) {
    // Update the chat container for both sender and receiver
    appendMessageToChat(data);
    console.log(data);
});

function sendMessage() {
    var content = document.getElementById('content').value;
    if (content.trim() !== "") {
        var currentTime = new Date().toISOString();
        // Send message to both sender and receiver rooms
        socket.send({ 'selectedUserId': selectedUserId, 'content': content, 'time': currentTime });

        // Add the message to the sender's chat container as a sent message
        var newMessageSent = {
            content: content,
            sender: userId,
            time: currentTime,
            receiver: selectedUserId
        };

        // appendMessageToChat(newMessageSent);

        document.getElementById('content').value = "";
    }
}

function selectUser(userId) {
    selectedUserId = userId;

    console.log(selectedUserId);

    // Join the logged-in user to their own room
    socket.emit('join', { 'selectedUserId': userId });

    // Update UI elements
    document.getElementById('selected-user').innerHTML = document.getElementById('names' + userId).innerHTML;
    document.getElementById('receiver-id').src = 'https://bootdey.com/img/Content/avatar/avatar' + userId + '.png';
    clearChatContainer();
    loadPreviousMessages();

    document.getElementById('message-form').style.display = 'block';
}

function loadPreviousMessages() {
    if (selectedUserId) {
        var chatContainer = document.getElementById('chat-message-container');
        if (chatContainer) {
            // Clear the chat container before loading previous messages
            clearChatContainer();

            fetch(`/get_messages/${selectedUserId}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(message => {
                        appendMessageToChat(message, message.sender === userId ? 'my-message' : 'other-message', true);
                    });
                })
                .catch(error => console.error('Error fetching messages:', error));
        }
        document.getElementById('message-form').style.display = 'block';
    } else {
        document.getElementById('message-form').style.display = 'none';
    }
}

function appendMessageToChat(message, isOldMessage) {
    var chatContainer = document.getElementById('chat-message-container');
    if (chatContainer) {
        var listItem = document.createElement('li');
        listItem.className = "clearfix";

        var messageType = message.sender == userId ? 'my-message' : 'other-message';

        listItem.innerHTML = `
            <div class="message-data ${messageType === 'my-message' ? 'text-right' : 'text-left'}">
                <span class="message-data-time">${new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar${message.sender}.png" alt="avatar">
            </div>
            <div class="message ${messageType} float-${messageType == 'my-message' ? 'right' : 'left'}">${message.content}</div>
        `;

        chatContainer.appendChild(listItem);
    }
}

function clearChatContainer() {
    var chatContainer = document.getElementById('chat-message-container');
    if (chatContainer) {
        chatContainer.innerHTML = "";
    }
}

