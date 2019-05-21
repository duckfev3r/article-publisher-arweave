export default function unixToDateTime(timestamp: any){

    // Months array
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    const date = new Date(timestamp*1000);
   
    // Year
    const year = date.getFullYear();
    const shortYear = parseInt(year.toString().substr(2))
    // Month
    const month = months_arr[date.getMonth()];
   
    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = "0" + date.getMinutes();
   
    // Seconds
    const seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format

    const convdataTime = `${month} ${day}`
    // const convdataTime = month+' '+day+' '+shortYear+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return convdataTime
   }