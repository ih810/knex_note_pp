/**********************************************
 * Note Router Test
 * ==================================
 * The purpose of this class is to test the routes, and how that interacts with the database.
 ***********************************************/
const NoteRouter = require("../Router/NoteRouter");

let noteService;
let res;
let noteRouter;

/**********************************************
 * Before each test, we should mock the list, add, remove and update function. It will always return true.
 * ==================================
 ***********************************************/
describe("NoteRouter with a function noteService", () => {
  beforeEach(() => {
    noteService = {
      list: jest.fn().mockResolvedValue(true),
      add: jest.fn().mockResolvedValue(true),
      delete: jest.fn().mockResolvedValue(true),
      edit: jest.fn().mockResolvedValue(true),
    };
    noteRouter = new NoteRouter(noteService);

    res = {
      status: jest.fn().mockResolvedValue(200),
      json: () => {
        return "No Error here what so ever";
      },
      render: () => {
        console.log("uh huh");
      },
    };
  });

  test("get / work?", (done) => {
    noteRouter
      .get(
        {
          auth: {
            user: "u1",
          },
        },
        res
      )
      .then(() => {
        expect(noteService.list).toHaveBeenCalledWith("u1");
      });
    done();
  });

  test("add note work?", (done) => {
    noteRouter
      .post(
        {
          auth: {
            user: "u1",
          },
          body: {
            note: "what?",
          },
        },
        res
      )
      .then(() => {
        expect(noteService.add).toHaveBeenCalledWith("what?", "u1");
        expect(noteService.write).toHaveBeenCalled();
        expect(noteService.list).toHaveBeenCalledWith("u1");
        expect(response.status).not.toHaveBeenCalled();
      });
    done();
  });

  test("put work?", (done) => {
    noteRouter.put({
      auth: {
        user: "u1",
      },
      body: {
          note: "huh",
      },
      params: {
          id: 1
      }
    },
    res
    )
    .then(()=>{
        expect(noteService.edit).toHaveBeenCalledWith(1, 'huh', 'u1');
        expect(noteService.list).toHaveBeenCalledWith('u1');
        expect(response.status).not.toHaveBeenCalled();
    })
    done();
  });

  test('delete work?', (done)=>{
    noteRouter
    .delete(
        {
            auth:{
                user:"u1",
            },
            params:{
                id:1
            }
        },
        res
    )
    .then(()=>{
        expect(noteService.delete).toHaveBeenCalledWith(1, 'u1');
        expect(noteService.list).toHaveBeenCalledWith('u1');
        expect(response.status).not.toHaveBeenCalled();
    })
    done()
  })
});
