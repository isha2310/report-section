$(document).ready(function () {
    let arr = [{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'}]
    let arr2 = [{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'}]
    let arr3 = [{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'},{type: 'Total IVs', count: '157.4k'}]

    arr.forEach((ele) => {
        let div = document.createElement("div")
        div.classList.add("report_element", "report_element1")
        let p1 = document.createElement("p")
        p1.innerHTML = ele.type
        p1.classList.add("report-element_heading")
        let p2 = document.createElement("p")
        p2.innerHTML = ele.count
        p2.classList.add("report-element_count")
        div.append(p1,p2)
        $("#report_heading1_div").append(div)
    })
    arr2.forEach((ele) => {
        let div = document.createElement("div")
        div.classList.add("report_element", "report_element2")
        let p1 = document.createElement("p")
        p1.innerHTML = ele.type
        p1.classList.add("report-element_heading")
        let p2 = document.createElement("p")
        p2.innerHTML = ele.count
        p2.classList.add("report-element_count")
        div.append(p1,p2)
        $("#report_heading2_div").append(div)
    })
    arr3.forEach((ele) => {
        let div = document.createElement("div")
        div.classList.add("report_element", "report_element3")
        let p1 = document.createElement("p")
        p1.innerHTML = ele.type
        p1.classList.add("report-element_heading")
        let p2 = document.createElement("p")
        p2.innerHTML = ele.count
        p2.classList.add("report-element_count")
        div.append(p1,p2)
        $("#report_heading3_div").append(div)
    })
    arr.forEach((ele) => {
        let div = document.createElement("div")
        div.classList.add("report_element", "report_element1")
        let p1 = document.createElement("p")
        p1.innerHTML = ele.type
        p1.classList.add("report-element_heading")
        let p2 = document.createElement("p")
        p2.innerHTML = ele.count
        p2.classList.add("report-element_count")
        div.append(p1,p2)
        $("#report_heading4_div").append(div)
    })
    $("#dropbtn1").on('click', function(){
        document.getElementById("myDropdown1").classList.toggle("showDropdown");
    })
    $("#dropbtn2").on('click', function(){
        document.getElementById("myDropdown2").classList.toggle("showDropdown");
    })
    $("#dropbtn3").on('click', function(){
        document.getElementById("myDropdown3").classList.toggle("showDropdown");
    })
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showDropdown')) {
              openDropdown.classList.remove('showDropdown');
            }
          }
        }
    }
})