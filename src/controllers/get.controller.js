
async function GetEvent(data, setData) {
    try {
        const req = await fetch("https://backend-envent-app.vercel.app/api/get-event", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173"
          },
        });
        const res = await req.json()
        if (res && res.message && res.message === "ok") {
            setData(...data, res.data)
        } 
      } catch (error) {
        console.error(error); // Utile pour déboguer
     }
}

export default GetEvent
