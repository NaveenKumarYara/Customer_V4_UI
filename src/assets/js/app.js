'use strict';

(function ($) {
  function navLineResizeHandler() {
    var nav = $('.nav-tabs');
    var activeLink = nav.children('li.active');
    var activeLine = nav.children('.active-line');
    var windowWidth = $(window).scrollLeft();

    $.each(activeLine, function (index, element) {
      var $element = $(element);
      $element.css({
        width: $element.parent().children(".active").css("width"),
        left: $element.parent().children(".active").position().left - windowWidth
      });
    });
  }

  function navLineClickHandler() {
    var btnWidth = $(this).css("width");
    var line = $(this).parent().find(".active-line");
    var btnBox = this.getBoundingClientRect();
    var windowBox = this.parentNode.getBoundingClientRect();

    line.css({
      width: btnWidth,
      left: btnBox.left - windowBox.left
    });
  }

  $(document).ready(navLineResizeHandler);

  $(window).resize(function () {
    setTimeout(navLineResizeHandler, 1000);
  });

  var appliedTabBtn = $(".statistics .nav-tabs li");
  var appliedLine = $(".statistics .nav-tabs .active-line");
  appliedTabBtn.on("click", navLineClickHandler);

  //About Company tabs on company profile page
  var aboutCompanyTab = $(".card--about .nav-tabs li");
  var aboutCompanyLine = $(".card--about .nav-tabs .active-line");
  aboutCompanyTab.on("click", navLineClickHandler);

  //Benefits and Revenue Information tabs on company profile page
  var benefitsTab = $(".card--benefits .nav-tabs li");
  var benefitsLine = $(".card--benefits .nav-tabs .active-line");
  benefitsTab.on("click", navLineClickHandler);

  //Speciality and Company Technology tabs on company profile page
  var specialTab = $(".card--special .nav-tabs li");
  var specialLine = $(".card--special .nav-tabs .active-line");
  specialTab.on("click", navLineClickHandler);

  //Whitepapers and New and Press Release tabs on company profile page
  var whitepapersTab = $(".card--whitepapers .nav-tabs li");
  var whitepapersLine = $(".card--whitepapers .nav-tabs .active-line");
  whitepapersTab.on("click", navLineClickHandler);

  //Achievements and Partnerships tabs on company profile page
  var achievementsTab = $(".card--achievements .nav-tabs li");
  var achievementsLine = $(".card--achievements .nav-tabs .active-line");
  achievementsTab.on("click", navLineClickHandler);

  //Achievements and Partnerships tabs on company profile page
  var selectedJobDetailsTab = $("#selectedJobDetails .nav-tabs li");
  var selectedJobDetailsLine = $("#selectedJobDetails .nav-tabs .active-line");
  selectedJobDetailsTab.on("click", navLineClickHandler);
})($);
"use strict";

(function ($) {

  function createCharts(chartId) {
    var chartDiv = document.getElementById(chartId);

    if (chartDiv === null) {
      return;
    }

    var ctx = document.getElementById(chartId).getContext('2d');

    var purpleGrd = ctx.createLinearGradient(0, 20, 0, 0);
    purpleGrd.addColorStop(0, "rgba(172, 154, 249, 0.23)");
    purpleGrd.addColorStop(1, "rgba(172, 154, 249, 0)");

    var blueGrd = ctx.createLinearGradient(0, 20, 0, 0);
    blueGrd.addColorStop(0, "rgba(101, 203, 226, 0.23)");
    blueGrd.addColorStop(1, "rgba(101, 203, 226, 0)");

    var greenGrd = ctx.createLinearGradient(0, 20, 0, 0);
    greenGrd.addColorStop(0, "rgba(167, 217, 117, 0.23)");
    greenGrd.addColorStop(1, "rgba(167, 217, 117, 0)");

    var myChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: [{
          label: 'Jobs Posted',
          data: [100, 19, 3, 5, 2, 3],
          backgroundColor: purpleGrd,
          borderColor: 'rgba(172, 154, 249, 1)',
          borderWidth: 2,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "transparent",
          pointHoverBorderColor: "transparent",
          tooltips: {
            enabled: false
          }
        }, {
          label: 'Jobs Filled',
          data: [60, 25, 30, 10, 30, 7],
          backgroundColor: blueGrd,
          borderColor: 'rgba(101, 203, 226, 1)',
          borderWidth: 2,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "transparent",
          pointHoverBorderColor: "transparent",
          tooltips: {
            enabled: false
          }
        }, {
          label: 'Jobs Cancelled',
          data: [12, 45, 34, 23, 50, 30],
          backgroundColor: greenGrd,
          borderColor: 'rgba(167, 217, 117, 1)',
          borderWidth: 2,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "transparent",
          pointHoverBorderColor: "transparent",
          tooltips: {
            enabled: false
          }
        }]
      },
      options: {

        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "transparent"
            },
            ticks: {
              beginAtZero: true,
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              borderDash: [8, 4]
            },
            ticks: {
              beginAtZero: true,
              display: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  createCharts("jobsDetail-week-chart");
  createCharts("jobsDetail-month-chart");
  createCharts("applicantsDetail-week-chart");
  createCharts("applicantsDetail-month-chart");

  var userOptionsList = $("ul.user-options");
  var userOptionItem = userOptionsList.find("li.user-option");
  var dropdownMenu = userOptionsList.find(".dropdown-menu");
  var userOptionsMoved = false;

  function userMenuPlacement() {
    var windowWidth = window.innerWidth;
    if (windowWidth <= 1460 && !userOptionsMoved) {
      var ul = $("<ul></ul>");
      var li = $("<li></li>");
      $.each(userOptionItem, function (index, element) {
        ul.prepend(element);
      });
      li.append(ul);
      dropdownMenu.prepend(li);
      userOptionsMoved = true;
    } else if (windowWidth >= 1461 && userOptionsMoved) {
      $.each(userOptionItem, function (index, element) {
        userOptionsList.prepend(element);
      });
      userOptionsMoved = false;
    }
  }

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

  function getTimeString(eventDate) {
    var timePosition = eventDate.indexOf("T");
    var colonPosition = getPosition(eventDate, ":", 2);
    //collect all dates
    if (timePosition != -1) {
      return moment(eventDate.substr(timePosition + 1, getPosition(eventDate, ":", 2)), 'HH:mm:ss').format('h a'); //Converts time 13:00:00 to 01:00pm
    } else {
      return '-'; //Returns - if time is not provided in the event
    }
  }

  function getDateString(eventDate) {
    var timePosition = eventDate.indexOf("T");
    //collect all dates
    if (timePosition != -1) {
      return moment(eventDate.substr(0, timePosition)).format('MMM DD'); //Converts time 13:00:00 to 01:00pm
    } else {
      return eventDate; //Returns - if time is not provided in the event
    }
  }

  function showDaysInMonth(events) {
    events.sort();
    var current = null;
    var cnt = 0;
    for (var i = 0; i < events.length; i++) {
      if (events[i] != current) {
        if (cnt > 0) {
          console.log(cnt);
        }
        current = events[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
  }

  $(window).on("resize", userMenuPlacement);
  $(document).ready(userMenuPlacement);
  $(document).ready(function () {

    var FC = $.fullCalendar; // a reference to FullCalendar's root namespace
    var View = FC.View; // the class that all views must inherit from
    var CustomView; // our subclass

    CustomView = View.extend({ // make a subclass of View

      initialize: function initialize() {
        // called once when the view is instantiated, when the user switches to the view.
        // initialize member variables or do other setup tasks.
        //View.prototype.initialize.apply(this, arguments);
        this.wrapperElement = $('<ul class="responsive-table"></ul>');
        this.tableHeader = $("<li class=\"table-header\">\n                                <div class=\"col col-1\">Job Title/Location</div>\n                                <div class=\"col col-2\">Date and Time</div>\n                                <div class=\"col col-3\">Candidate</div>\n                                <div class=\"col col-4\">Hiring Leader</div>\n                                <div class=\"col col-5\">Screening Team</div>\n                                <div class=\"col col-6\">Actions</div>\n                              </li>");
        this.tableBody = "";
      },

      render: function render() {
        // responsible for displaying the skeleton of the view within the already-defined
        // this.el, a jQuery element.
        this.wrapperElement = $('<ul class="responsive-table"></ul>');
        this.tableHeader = $("<li class=\"table-header\">\n                                <div class=\"col col-1\">Job Title/Location</div>\n                                <div class=\"col col-2\">Date and Time</div>\n                                <div class=\"col col-3\">Candidate</div>\n                                <div class=\"col col-4\">Hiring Leader</div>\n                                <div class=\"col col-5\">Screening Team</div>\n                                <div class=\"col col-6\">Actions</div>\n                              </li>");
        this.tableBody = "";
        this.toolbarHtml = "<h4>Right Bar</h4>";
      },

      setHeight: function setHeight(height, isAuto) {
        // responsible for adjusting the pixel-height of the view. if isAuto is true, the
        // view may be its natural height, and `height` becomes merely a suggestion.
      },

      renderEvents: function renderEvents(events) {
        // reponsible for rendering the given Event Objects
        var eventsHTML = '';
        events.forEach(function (event) {
          var startTime = event.end !== null ? getTimeString(event.start._i) : '-';
          var endTime = event.end !== null ? getTimeString(event.end._i) : '-';
          var date = getDateString(event.start._i);
          var screeningTeamHTML = "";
          var screeningTeamImgsHTML = "";
          var screeningTeamNamesHTML = "";
          var teamNameCount = 0;
          var teamImgCount = 0;
          var teamSize = event.screeningTeam.length;

          event.screeningTeam.forEach(function (teamMember) {
            var name = void 0;
            teamNameCount++;
            if (teamNameCount > 2) {
              name = '';
            } else {
              name = teamMember.name.split(' ')[0];
            }
            //teamNameCount !== (teamSize)event.screeningTeam.length ---- not adding comma at the end of last name
            //teamNameCount ---- check if there are more than 1 elements in event
            teamSize > 0 && teamNameCount <= 2 && teamNameCount !== teamSize ? name += ', ' : '';
            screeningTeamNamesHTML += "" + name;
          });

          event.screeningTeam.forEach(function (teamMember) {
            teamImgCount++;
            screeningTeamImgsHTML += teamImgCount <= 2 ? "<img src=\"" + teamMember.imgUrl + "\" title=\"" + teamMember.name + "\"/>" : '';
          });

          var viewMore = teamNameCount > 2 ? "<a href=\"" + event.job.url + "\">+" + (teamNameCount - 2) + " Others</a>" : " ";

          var teamImagesClassName = teamSize >= 2 ? "two-images" : " ";

          screeningTeamHTML = "<div class=\"team-images " + teamImagesClassName + "\">\n                                 " + screeningTeamImgsHTML + "\n                               </div>\n                               <div class=\"team-names\">\n                                 " + screeningTeamNamesHTML + "\n                               </div> " + viewMore + " ";

          eventsHTML += "<li class=\"table-row\">\n                            <div class=\"col col-1 job-title-row\" data-label=\"Job Title/Location\">\n                              <div class=\"inner\">\n                                <h2>" + event.job.title + "</h2>\n                                <div class=\"location\">\n                                  <svg x=\"0px\" y=\"0px\" width=\"16px\" height=\"19.1px\" viewBox=\"0 0 16 19.1\" xml:space=\"preserve\" style=\"fill:#9EABC0;\">\n                                    <path d=\"M8,19.1c-0.2,0-0.4-0.1-0.6-0.2C7.1,18.7,0,13.9,0,8c0-4.4,3.6-8,8-8s8,3.6,8,8c0,5.9-7.1,10.7-7.4,10.9\n                                      C8.4,19.1,8.2,19.1,8,19.1z M8,2C4.7,2,2,4.7,2,8c0,4,4.4,7.7,6,8.9c1.6-1.2,6-4.9,6-8.9C14,4.7,11.3,2,8,2z\"/>\n                                    <path d=\"M8,11.3c-1.8,0-3.3-1.5-3.3-3.3S6.2,4.7,8,4.7s3.3,1.5,3.3,3.3S9.8,11.3,8,11.3z M8,6.7C7.3,6.7,6.7,7.3,6.7,8\n                                      S7.3,9.3,8,9.3c0.7,0,1.3-0.6,1.3-1.3S8.7,6.7,8,6.7z\"/>\n                                  </svg>\n                                  " + event.job.location + "\n                                </div>\n                              </div>\n                            </div>\n                            <div class=\"col col-2 date-row\" data-label=\"Date &amp; Time\">\n                              <div class=\"event-date\">                              \n                                " + date + "\n                              </div>\n                              <div class=\"event-time\">\n                                <span>" + startTime + "</span>\n                                <span>-</span>\n                                <span>" + endTime + "</span>\n                              </div>\n                            </div>\n                            <div class=\"col col-3 candidate-row\" data-label=\"Candidate\">\n                              <div>\n                                <img src=\"" + event.candidate.imgUrl + "\" title=\"" + event.candidate.name + "\"/>\n                                <span class=\"name\">" + event.candidate.name + "</span>\n                              </div>\n                            </div>\n                            <div class=\"col col-4 leader-row\" data-label=\"Hiring Leader\">\n                              <div class=\"leader-row\">\n                                <img src=\"" + event.hiringLeader.imgUrl + "\" title=\"" + event.hiringLeader.name + "\"/>\n                                <span class=\"name\">" + event.hiringLeader.name + "</span>\n                              </div>\n                            </div>\n                            <div class=\"col col-5 team-row\" data-label=\"Screening Team\">\n                              <div>\n                                " + screeningTeamHTML + "\n                              </div>\n                            </div>\n                            <div class=\"col col-6 btn-row\" data-label=\"\">\n                              <a href=\"\" class=\"btn btn-border\">View Details</a>\n                            </div>\n                          </li>";
        });
        this.tableBody = eventsHTML;
        this.wrapperElement.append(this.tableHeader);
        this.wrapperElement.append(this.tableBody);
        this.el.html(this.wrapperElement);
      },

      destroyEvents: function destroyEvents() {
        // responsible for undoing everything in renderEvents
        this.wrapperElement = $('<ul class="responsive-table"></ul>');
      },

      renderSelection: function renderSelection(range) {
        // accepts a {start,end} object made of Moments, and must render the selection
      },

      destroySelection: function destroySelection() {
        // responsible for undoing everything in renderSelection
      }

    });

    FC.views.jobs = CustomView; // register our class with the view system

    FC.views.jobsAll = {
      type: 'jobs',
      duration: { year: 1 },
      defaults: {
        listDayAltFormat: 'dddd' // day-of-week is nice-to-have
      }
    };

    var filtersHTML = "<div class=\"calendar-filters\">\n                        <div class=\"form-inline\">\n                          <div class=\"form-group\">\n                            <label>Filter By: </label>\n                            <select class=\"form-control\">\n                              <option>Job Title</option>\n                              <option>Location</option>\n                              <option>Date</option>\n                            </select>\n                          </div>\n                          <div class=\"form-group\">\n                            <label>Sort By: </label>\n                            <select class=\"form-control\">\n                              <option>Job Title</option>\n                              <option>Location</option>\n                              <option>Date</option>\n                            </select>\n                          </div>\n                        </div>\n                      </div>";

    setTimeout(function () {
      $('#calendar').find('.fc-right').append(filtersHTML);
    }, 1);

    var mobileCheck = window.innerWidth <= 991 ? 'month,listWeek,jobsAll' : 'month,agendaWeek,jobsAll';

    var calendarFilters = void 0;

    var scheduleCalender = $('#calendar').fullCalendar({
      header: {
        left: mobileCheck,
        center: '',
        right: 'prev,title,next'
      },
      buttonText: {
        month: 'month',
        week: 'week',
        day: 'day',
        listWeek: 'Week',
        jobsAll: 'List'
      },
      timeFormat: 'h:mm',
      displayEventTime: false,
      editable: false,
      eventLimit: false, // allow "more" link when too many events
      minTime: "09:00:00",
      agendaEventMinHeight: 228,
      agenda: {
        titleFormat: 'DDD MMM D'
      },
      slotEventOverlap: false,
      maxTime: "19:00:00",
      events: [{
        id: 1000,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-2.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-1.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-03-16T16:00:00',
        end: '2018-03-16T18:00:00'
      }, {
        id: 1001,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-2.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-1.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-03-16T14:00:00',
        end: '2018-03-16T16:00:00'
      }, {
        id: 1002,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-2.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-1.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }],
        start: '2018-03-16T16:00:00',
        end: '2018-03-16T18:00:00'
      }, {
        id: 1003,
        title: 'title here',
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-2.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-1.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-16T16:00:00',
        end: '2018-04-16T18:00:00'
      }, {
        id: 1004,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-17T12:00:00',
        end: '2018-04-17T14:00:00'
      }, {
        id: 1005,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-18T15:00:00',
        end: '2018-04-18T16:00:00'
      }, {
        id: 1006,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-18T11:00:00',
        end: '2018-04-18T13:00:00'
      }, {
        id: 1007,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-20T14:00:00',
        end: '2018-04-20T15:00:00'
      }, {
        id: 1008,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-21T16:00:00',
        end: '2018-04-21T18:00:00'
      }, {
        id: 1009,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-23T10:00:00',
        end: '2018-04-23T12:00:00'
      }, {
        id: 1010,
        job: {
          title: "Senior Tax Accountant",
          location: "New York, USA",
          url: '/jobs/detail.html'
        },
        candidate: {
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        },
        hiringLeader: {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        },
        screeningTeam: [{
          name: "John Smith",
          imgUrl: '/images/ui-face-1.png'
        }, {
          name: "Terry Martin",
          imgUrl: '/images/ui-face-2.png'
        }],
        start: '2018-04-27T12:00:00',
        end: '2018-04-27T14:00:00'
      }],
      eventRender: function eventRender(event, element, view) {
        if (view.type === "month") {
          setTimeout(function () {
            $('.calendar-filters').css({ 'display': 'none' });
          }, 0);

          $(element).each(function () {
            $(this).attr('date-num', event.start.format('YYYY-MM-DD'));
          });
        } else if (view.type === "agendaWeek") {
          setTimeout(function () {
            $('.calendar-filters').css({ 'display': 'none' });
          }, 0);

          if (event.job !== undefined && event.candidate !== undefined) {
            var startTime = event.end !== null ? getTimeString(event.start._i) : '-';
            var endTime = event.end !== null ? getTimeString(event.end._i) : '-';
            var html = "";
            html = "<div class=\"job cell jsTemplate\">\n                      <div class=\"event-time\">\n                        <span>" + startTime + "</span>\n                        <span>-</span>\n                        <span>" + endTime + "</span>\n                      </div>\n                      <h4 class=\"job-title\">" + event.job.title + "</h4>\n                      <div class=\"meta\">\n                        <span>\n                          <svg width=\"12px\" height=\"14.6px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"1953.045 -2403.577 12.065 14.643\">\n                            <g transform=\"translate(1383 -2976)\">\n                              <path style=\"fill: #c6c6c6;\" d=\"M404.865,440.181c0,4.64-5.981,8.662-5.981,8.662s-5.981-4.022-6.084-8.662a6.033,6.033,0,0,1,12.065,0Z\" transform=\"translate(177.245 138.223)\"/>\n                              <circle style=\"fill: #fff;\" cx=\"1.959\" cy=\"1.959\" r=\"1.959\" transform=\"translate(574.169 576.445)\"/>\n                            </g>\n                          </svg>\n                          " + event.job.location + "\n                        </span>                           \n                      </div>\n                      <div>\n                        <h5>Candidate</h5>\n                        <div class=\"candidate\">\n                          <img src=\"/images/ui-face-1.png\" class=\"ui-pic\" title=\"" + event.candidate.name + "\" alt=\"User Pic\">\n                          <h2>" + event.candidate.name + "</h2>\n                        </div>\n                      </div>\n                      <a href=\"\" class=\"btn btn-block btn-border\">View Details</a>\n                    </div>\n                    <hr class=\"jsBorder\" />";
            return html;
          }
        } else if (view.type === "listWeek") {
          setTimeout(function () {
            $('.calendar-filters').css({ 'display': 'none' });
          }, 0);
          var _startTime = event.end !== null ? getTimeString(event.start._i) : '-';
          var _endTime = event.end !== null ? getTimeString(event.end._i) : '-';
          var _html = "";
          _html = "\n                      <div class=\"job cell jsTemplate\">\n                        <div class=\"event-time\">\n                          <span>" + _startTime + "</span>\n                          <span>-</span>\n                          <span>" + _endTime + "</span>\n                        </div>\n                        <div class=\"job-title-row\">\n                          <h4 class=\"job-title\">" + event.job.title + "</h4>\n                          <div class=\"meta\">\n                            <span>\n                              <svg width=\"12px\" height=\"14.6px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"1953.045 -2403.577 12.065 14.643\">\n                                <g transform=\"translate(1383 -2976)\">\n                                  <path style=\"fill: #c6c6c6;\" d=\"M404.865,440.181c0,4.64-5.981,8.662-5.981,8.662s-5.981-4.022-6.084-8.662a6.033,6.033,0,0,1,12.065,0Z\" transform=\"translate(177.245 138.223)\"/>\n                                  <circle style=\"fill: #fff;\" cx=\"1.959\" cy=\"1.959\" r=\"1.959\" transform=\"translate(574.169 576.445)\"/>\n                                </g>\n                              </svg>\n                              " + event.job.location + "\n                            </span>                           \n                          </div>\n                        </div>\n                        <div>\n                          <h5>Candidate</h5>\n                          <div class=\"candidate\">\n                            <img src=\"/images/ui-face-1.png\" class=\"ui-pic\" title=\"" + event.candidate.name + "\" alt=\"User Pic\">\n                            <h2>" + event.candidate.name + "</h2>\n                          </div>\n                        </div>\n                        <div>\n                          <a href=\"\" class=\"btn btn-block btn-border\">View Details</a>\n                        </div>\n                      </div>\n                    ";
          return _html;
        }
      },
      removeEvents: function removeEvents() {
        // responsible for undoing everything in renderEvents
      },
      eventAfterRender: function eventAfterRender(event, element, view) {
        console.log(view);
      },
      eventAfterAllRender: function eventAfterAllRender(view) {
        if (view.type === "month") {
          var cDay;
          var html;
          var eventCount;
          var dayEl;
          var dateNum;
          var label;
          if ($('.event-count').length > 0) {
            return;
          }
          for (cDay = view.start.clone(); cDay.isBefore(view.end); cDay.add(1, 'day')) {
            dateNum = cDay.format('YYYY-MM-DD');
            dayEl = $('.fc-day[data-date="' + dateNum + '"]');
            eventCount = $('.fc-event[date-num="' + dateNum + '"]').length;
            if (eventCount) {
              label = eventCount > 1 ? "Interviews" : "Interview";
              html = "<div class=\"event-count\">\n                        <div>\n                          " + eventCount + "\n                        </div>\n                        <span>\n                          " + label + "\n                        </span>\n                      </div>";

              dayEl.append(html);
            }
          }
        }
      },
      destroySelection: function destroySelection() {
        // responsible for undoing everything in renderSelection
      }
    }); //Full Calendar

    $('.fc-jobsAll-button').on('click', function () {
      $('.fc-right .calendar-filters').css({ 'display': 'block' });
      $('.fc-right > div:not(.calendar-filters)').css({ 'display': 'none' });
    });

    $('.fc-month-button').on('click', function () {
      $('.fc-right > div:not(.calendar-filters)').css({ 'display': 'inline-block' });
    });

    $('.fc-agendaWeek-button').on('click', function () {
      $('.fc-right > div:not(.calendar-filters)').css({ 'display': 'inline-block' });
    });

    $('.fc-listWeek-button').on('click', function () {
      $('.fc-right > div:not(.calendar-filters)').css({ 'display': 'inline-block' });
    });

    //Video Player - company
    var videoWrapper = $('#company-video');
    var videoPlayer = videoWrapper.find('video');
    var videoOverlay = videoWrapper.find('.video__overlay');
    var playBtn = videoWrapper.find('.video__play');

    //Custom Scroll bar 
    $('.scrollbar-inner').scrollbar();

    // $('.carousel[data-type="multi"] .item').each(function(){
    //   var itemToClone = $(this);

    //   for (var i=1;i<6;i++) {
    //     itemToClone = itemToClone.next();

    //     // wrap around if at end of item collection
    //     if (!itemToClone.length) {
    //       itemToClone = $(this).siblings(':first');
    //     }

    //     // grab item, clone, add marker class, add to collection
    //     itemToClone.children(':first-child').clone()
    //       .addClass("cloneditem-"+(i))
    //       .appendTo($(this));
    //   }
    // });
  });
})(jQuery);

(function ($) {

  function responsiveTabsMenu(tabId) {
    var $placeholderDiv = $("#" + tabId + " .selected-tab");
    var $menuList = $placeholderDiv.next('.responsive');
    var $menuListItem = $menuList.find('li');
    var $menuListAnchors = $menuList.find('a');
    console.log($placeholderDiv);
    $placeholderDiv.html($menuList.find("li.active a").first().html());

    $placeholderDiv.click(function () {
      $menuList.toggleClass('active');
    });

    $menuListAnchors.click(function () {
      $placeholderDiv.html($(this).closest('li').html());
      $menuList.removeClass('active');
    });
  }

  responsiveTabsMenu("whitepapers-tabs");

  responsiveTabsMenu("achievement-tabs");

  responsiveTabsMenu("special-tabs");

  responsiveTabsMenu("benefits-tabs");

  responsiveTabsMenu("subscription");
})(jQuery);

(function ($) {
  $(".custom-select").each(function () {
    var $this = $(this),
        $noOfOptions = $this.children("option").length;
    var $icon = $('<img class="select-icon" src="images/down-chevron-sm.svg" />');

    $this.addClass("select-hidden");
    $this.wrap('<div class="custom-select"></div>');
    $this.after('<div class="select-box"></div>');

    var $styledSelect = $this.next('div.select-box');

    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < $noOfOptions; i++) {
      var text = $this.children('option').eq(i).text();
      $('<li />', {
        rel: $this.children('option').eq(i).val()
      }).append("<span>" + text + "</span>").appendTo($list);
    }

    $this.parent().append($icon);

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.select-box.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });
  });
})(jQuery);

// Show / Hide details on Create a job Page
(function ($) {
  var toggleBtn = $('.toggle-btn');

  toggleBtn.on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.closest('.results').find('.summary').slideToggle(function () {
      $this.text() == "Show Details" ? $this.text("Hide Details") : $this.text("Show Details");
    });
  });
})(jQuery);

//Custom buttons for jquery time spinner - Create a job Page
$.widget("ui.spinner", $.ui.spinner, {
  _buttonHtml: function _buttonHtml() {
    return "" + "<a class='ui-spinner-button ui-spinner-up'>" + "<span><img src='images/slider-nav-right.png'/></span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down'>" + "<span><img src='images/slider-nav-right.png'/></span>" + "</a>";
  }
});

//Required experience - Create a job page
(function ($) {
  var minYear = 0,
      maxYear = 0;
  var $maxYearSpinner = $('.re-group #re_year');
  var $minYearSpinner = $('.re-group #re_month');
  var $parentDiv = $maxYearSpinner.closest('.form-group');
  var $outputDiv = $parentDiv.find('.experience-output');
  var $timePicker = $parentDiv.find('.time-picker');

  var options = {
    min: 1,
    max: 12,
    step: 1
  };

  $maxYearSpinner.spinner(options);
  $minYearSpinner.spinner(options);

  function changeHandlerMinYear(e, ui) {
    minYear = ui.value;
    $outputDiv.text(minYear + " - " + maxYear + "Years");
  }

  function changeHandlerMaxYear(e, ui) {
    maxYear = ui.value;
    $outputDiv.text(minYear + " - " + maxYear + "Years");
  }

  $maxYearSpinner.on('spin', changeHandlerMaxYear);
  $minYearSpinner.on('spin', changeHandlerMinYear);

  //slide toggle time picker
  $outputDiv.on('click', function () {
    $timePicker.slideToggle('fast');
  });
})(jQuery);

//Skill wise experience - Create a job page
(function ($) {
  var minMonth = 0,
      minYear = 0;
  var $minMonthSpinner = $('.candidate-group .sw-exp-min #min_month');
  var $minYearSpinner = $('.candidate-group .sw-exp-min #min_year');
  var $parentDiv = $minYearSpinner.closest('.form-group');
  var $outputDiv = $parentDiv.find('.experience-output');
  var $timePicker = $parentDiv.find('.time-picker');

  var options = {
    min: 1,
    max: 12,
    step: 1
  };

  $minMonthSpinner.spinner(options);
  $minYearSpinner.spinner(options);

  function changeHandlerMinMonth(e, ui) {
    minMonth = ui.value;
    $outputDiv.text(minMonth + "m  " + minYear + "y");
  }

  function changeHandlerMinYear(e, ui) {
    minYear = ui.value;
    $outputDiv.text(minMonth + "m  " + minYear + "y");
  }

  $minMonthSpinner.on('spin', changeHandlerMinMonth);
  $minYearSpinner.on('spin', changeHandlerMinYear);

  //slide toggle time picker
  $outputDiv.on('click', function () {
    $timePicker.slideToggle('fast');
  });
})(jQuery);

//Skill wise experience - Create a job page
(function ($) {
  var minMonth = 0,
      minYear = 0;
  var $minMonthSpinner = $('.candidate-group .sw-exp-max #min_month');
  var $minYearSpinner = $('.candidate-group .sw-exp-max #min_year');
  var $parentDiv = $minYearSpinner.closest('.form-group');
  var $outputDiv = $parentDiv.find('.experience-output');
  var $timePicker = $parentDiv.find('.time-picker');

  var options = {
    min: 1,
    max: 12,
    step: 1
  };

  $minMonthSpinner.spinner(options);
  $minYearSpinner.spinner(options);

  function changeHandlerMinMonth(e, ui) {
    minMonth = ui.value;
    $outputDiv.text(minMonth + "m  " + minYear + "y");
  }

  function changeHandlerMinYear(e, ui) {
    minYear = ui.value;
    $outputDiv.text(minMonth + "m  " + minYear + "y");
  }

  $minMonthSpinner.on('spin', changeHandlerMinMonth);
  $minYearSpinner.on('spin', changeHandlerMinYear);

  //slide toggle time picker
  $outputDiv.on('click', function () {
    $timePicker.slideToggle('fast');
  });
})(jQuery);

(function () {
  var availableTags = ["Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium", "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,", "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae"];

  var domains = ['Marketing', 'Finance', 'Operations', 'IT', 'Housekeeping', 'Taxation', 'Research'];

  var teamMembers = ['Terry Martin', 'John Smith', 'David Cameron', 'Joe Butler'];

  $(".page--create-a-job #responsibility").autocomplete({
    source: availableTags
  });

  $('.page--create-a-job #domain').autocomplete({
    source: domains
  });

  $('.page--create-a-job #team-members').autocomplete({
    source: teamMembers
  });
})(jQuery);

//Form steps (Tabs) on create a job page.
(function ($) {

  console.log(TUIHelpers);

  $('.btn-next').click(function (e) {
    e.preventDefault();
    $('.form-steps .nav-tabs > .active.tab-list').nextAll('li.tab-list:first').find('a').trigger('click');
    TUIHelpers.scrollToSection('#steps-tab', 500);
  });

  $('.btn-prev').click(function (e) {
    e.preventDefault();
    console.log($('.form-steps .nav-tabs > .active.tab-list').prevAll('li.tab-list:first'));
    $('.form-steps .nav-tabs > .active.tab-list').prevAll('li.tab-list:first').find('a').trigger('click');
    TUIHelpers.scrollToSection('#steps-tab', 500);
  });

  var $tabsList = $('#steps-tab');
  var $tabLinks = $tabsList.find('a[data-toggle="tab"]');

  $tabLinks.on('shown.bs.tab', function (e) {
    var $thisUrl = $(this).attr('href');

    //Remove class from all links before detecting the current link.
    $.each($tabLinks, function () {
      $(this).removeClass('completed');
    });

    //Add Class to all elements before current link
    $.each($tabLinks, function (index, element) {
      var $element = $(element);
      var isCurrent = $(element).attr('href') === $thisUrl ? true : false;

      if (isCurrent) {
        return false; //Return false before adding class to break out of the loop.
      }

      if (!$element.hasClass('completed')) {
        $element.addClass('completed');
      }
    });
  });
})(jQuery);

//Close modal and show another when submitting form - create-a-job page
(function ($) {
  var $culturalModal = $('#cultural-modal');
  var $closeBtn = $culturalModal.find('.close-btn');

  $closeBtn.click(function () {
    $('#cultural-modal').modal('hide');
    $('#question-modal').modal('show');

    $('#question-modal').on('shown.bs.modal', function () {
      $('body').addClass('modal-open').css({
        "padding-right": "0",
        "padding-left": "0"
      });

      $(this).css({ "padding-left": "0" });
    });

    $('#question-modal').on('hidden.bs.modal', function () {
      $('body').removeClass('modal-open').css({
        "padding-left": "0",
        "padding-right": "0"
      });
    });
  });
})(jQuery);

(function ($) {

  var $searchBox = $('.search-toggle');
  var $searchBtn = $searchBox.find('a');
  var $searchInput = $searchBox.find('input[type=text]');

  $searchBtn.on('click', function (e) {
    e.preventDefault();
    $searchInput.toggleClass('open');
  });
})(jQuery);

(function ($) {

  var $filtersBtn = $('.adv-filters-btn');
  var $filtersDiv = $('.adv-filters');
  var $filtersCancel = $filtersDiv.find('.btn-border');

  $filtersBtn.on('click', function (e) {
    e.preventDefault();
    $filtersDiv.slideToggle('fast');
    $filtersCancel.on('click', function (e) {
      e.preventDefault();
      $filtersDiv.slideUp('fast');
    });
  });
})(jQuery);

//Matching Details inside card -- page--job-details
(function ($) {
  //TODO: test multiple cards -- open and close function

  var $card = $('.page--job-details .tab-content .card');
  var $detailsBtn = $card.find('.show-matching-details');

  $detailsBtn.on('click', function (e) {
    e.preventDefault();
    var $selectedCard = $(this).closest('.card');
    var $detailsDiv = $selectedCard.find('.matching-details');
    var $detailsCloseBtn = $selectedCard.find('.close');
    $detailsDiv.toggleClass('open');

    $detailsCloseBtn.on('click', function (e) {
      e.preventDefault();
      $detailsDiv.removeClass('open');
    });
  });
})(jQuery);

(function ($) {

  $('#cultural-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>', '<span class="icon-down-arrow"><img src="/images/slider-nav-right.png" alt=""></span>'],
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 3
      },
      1000: {
        items: 6
      }
    }
  });

  $('.skills-carousel').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ['<img src="/images/left-chev.svg" alt="">', '<img src="/images/right-chev.svg" alt="">'],
    0: {
      items: 2
    },
    600: {
      items: 3
    }
  });

  //TODO: put it seperate closure
  $('.datepicker').datepicker({
    daysOfWeekDisabled: '06',
    startDate: new Date(),
    format: 'M, dd yyyy'
  }).on('changeDate', function () {
    $(this).datepicker('hide');
  });
})(jQuery);

(function ($) {
  var $tuiTooltip = $('.tui-tooltip');
  var $tooltipContent = $('.tooltip-content');

  $tuiTooltip.on('click', function (e) {
    e.preventDefault();
    $tooltipContent.toggleClass('open');
  });
})(jQuery);

(function ($) {
  var $chatBox = $('#chat-box');
  var $messageLink = $('.message-content');
  var $backBtn = $chatBox.find('.back');

  $messageLink.on('click', function (e) {
    e.preventDefault();
    $chatBox.addClass('open');
  });

  $backBtn.on('click', function () {
    $chatBox.removeClass('open');
  });
})(jQuery);

(function ($) {

  var $editBtn = $('.edit-btn');

  $.each($editBtn, function (index, element) {
    var $element = $(element);
    $element.on('click', function (e) {
      e.preventDefault();
      var $editGroup = $element.closest('.edit-group');
      var $editForm = $editGroup.find('.edit-form');
      var $data = $editGroup.find('.data');
      var $cancelBtn = $editForm.find('.btn-border');

      $data.hide();
      $editForm.show();

      $cancelBtn.on('click', function (e) {
        e.preventDefault();
        $data.show();
        $editForm.hide();
      });
    });
  });
})(jQuery);

(function ($) {
  var FC = $.fullCalendar; // a reference to FullCalendar's root namespace
  var View = FC.View; // the class that all views must inherit from
  var CustomView = void 0; // our subclass

  CustomView = View.extend({ // make a subclass of View

    initialize: function initialize() {
      // called once when the view is instantiated, when the user switches to the view.
      // initialize member variables or do other setup tasks.
      this.wrapperElement = $('<ul class="responsive-table"></ul>');
      this.tableHeader = $("<li class=\"table-header\">\n                              <div class=\"col col-1\">Description</div>\n                              <div class=\"col col-2\">Date</div>\n                              <div class=\"col col-3\">Amount</div>\n                            </li>");
      this.tableBody = "";
    },

    render: function render() {
      // responsible for displaying the skeleton of the view within the already-defined
      // this.el, a jQuery element.
      this.wrapperElement = $('<ul class="responsive-table"></ul>');
      this.tableHeader = $("<li class=\"table-header\">\n                              <div class=\"col col-1\">Description</div>\n                              <div class=\"col col-2\">Date</div>\n                              <div class=\"col col-3\">Amount</div>\n                            </li>");
      this.tableBody = "";
      this.tableFooter = "";
      this.emptyMessage = '';
    },
    viewRender: function viewRender(view, element) {
      console.log(element);
    },
    setHeight: function setHeight(height, isAuto) {
      // responsible for adjusting the pixel-height of the view. if isAuto is true, the
      // view may be its natural height, and `height` becomes merely a suggestion.
    },

    renderEvents: function renderEvents(events) {
      // reponsible for rendering the given Event Objects
      var eventsHTML = "";
      var totalAmount = 0;
      events.forEach(function (event) {
        eventsHTML += "<li class=\"table-row\">\n                          <div data-label=\"Description\" class=\"col col-1\">" + event.description + "</div>\n                          <div data-label=\"Date\" class=\"col col-2\">" + event.start.format('M/D/Y') + "</div>\n                          <div data-label=\"Amount\" class=\"col col-3\">" + event.amount + "</div>\n                        </li>";
      });

      totalAmount = events.map(function (event) {
        return event.amount;
      }).reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);

      this.tableFooter = "<li class=\"table-row\">\n                            <div class=\"col col-1\"></div>\n                            <div class=\"col col-2\">Total</div>\n                            <div class=\"col col-3\">" + totalAmount + "</div>\n                          </li>";

      this.tableBody = eventsHTML;
      this.wrapperElement.append(this.tableHeader);
      this.wrapperElement.append(this.tableBody);
      this.wrapperElement.append(this.tableFooter);

      this.emptyMessage = '<div class="fc-emptyState"><p>Sorry no transactions to show</p></div>';
      if (events.length > 0) {
        this.el.html(this.wrapperElement);
      } else {
        this.el.html(this.emptyMessage);
      }
    },

    destroyEvents: function destroyEvents() {
      // responsible for undoing everything in renderEvents
      this.wrapperElement = $('<ul class="responsive-table"></ul>');
      this.el.html(this.wrapperElement);
    },

    renderSelection: function renderSelection(range) {
      // accepts a {start,end} object made of Moments, and must render the selection
    },

    destroySelection: function destroySelection() {
      // responsible for undoing everything in renderSelection
    }

  });

  FC.views.billing = CustomView; // register our class with the view system

  FC.views.billingWeek = {
    type: 'billing',
    duration: { week: 1 },
    defaults: {
      listDayAltFormat: 'dddd' // day-of-week is nice-to-have
    }
  };

  $(document).on('shown.bs.tab', 'a[href="#billing-history"]', function (e) {
    var billingCalendar = $('#billing-history-calendar').fullCalendar({
      header: {
        left: 'billingWeek,listMonth',
        right: 'prev,title,next'
      },
      defaultView: 'billingWeek',
      buttonText: {
        listMonth: 'Month',
        billingWeek: 'Week'
      },
      events: [{
        id: 2000,
        description: 'Subscription Fee',
        start: '2018-05-16T15:00:00',
        amount: 123
      }, {
        id: 2000,
        description: 'Subscription Fee',
        start: '2018-05-16T15:00:00',
        amount: 123
      }, {
        id: 2000,
        description: 'Subscription Fee',
        start: '2018-05-16T15:00:00',
        amount: 123
      }, {
        id: 2000,
        description: 'Subscription Fee',
        start: '2018-05-28T15:00:00',
        amount: 123
      }],
      eventRender: function eventRender(event, element, view) {
        if (view.name == "listWeek") {}
      }
    });
  });
})(jQuery);
//# sourceMappingURL=app.js.map
