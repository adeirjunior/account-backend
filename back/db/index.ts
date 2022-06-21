import { connect } from "mongoose";

const runDatabase = (uri: any) => {
    connect(uri);

}
export default runDatabase;