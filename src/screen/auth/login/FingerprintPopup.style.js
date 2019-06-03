import Context from "context";
export default {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: Context.getColor("background")
  },
  logo: {
    marginTop: 45
  },
  heading: {
    textAlign: "center",
    color: Context.getColor("text"),
    fontSize: 21
  },
  description: error => ({
    textAlign: "center",
    color: error ? Context.getColor("primary") : Context.getColor("primary"),
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 20
  }),
  buttonContainer: {
    padding: 20
  },
  buttonText: {
    color: Context.getColor("textHint"),
    fontSize: 17,
    fontWeight: "bold"
  }
};
