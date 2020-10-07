module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setActivity("Kasim Akr PI ;help ", {
    type: "PLAYING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};
