import utils
import csv
import argparse

def read_correct_solutions(solutions_file):
    correct_solutions = {}
    with open(solutions_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile, ["id","solution"])
        for row in reader:
            correct_solutions[int(row["id"])]=int(row["solution"])
    return correct_solutions



def read_team(team_snapshot):
    name = team_snapshot.get("name")
    submits = team_snapshot.reference.collection("solutions")
    solutions = {}
    for sol in submits.get():
        solutions[sol.get("id")]=sol.get("solution")
    return name, solutions

def generate_report(submits, correct):
    correct_answers = {}
    points = 0
    for id in correct:
        correct_answers[id]=False
        if id in submits:
            if submits[id]==correct[id]:
                correct_answers[id]=True
                points += 1
    return points, correct_answers

def process_teams(teams_handle, correct):
    teams = []

    for team in teams_handle.get():
        name, submited = read_team(team)
        points, breakdown = generate_report(submited, correct)
        teams.append({"name":name, "points":points, "breakdown": breakdown})

    teams.sort(key=lambda x: x["points"], reverse=True)
    return teams


def write_report(report, filename, heading):
    with open(filename, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if heading:
            writer.writerow(["Name", "Points", *(sorted(report[0]["breakdown"].keys()))])
        for team in report:
            breakdown = team["breakdown"]
            breakdown = [1 if breakdown[i] else 0 for i in sorted(breakdown.keys())]
            writer.writerow([team["name"], team["points"], *breakdown])
            


def main():
    DEFAULTS = {
                "key": "./serviceAccountKey.json",
                }
    
    parser = argparse.ArgumentParser(description='Check teams answers, sort teams by score', epilog="Made by László Baráth (Sasszem), 2018")
    parser.add_argument('solutions', help='Solutions CSV file')
    parser.add_argument('report', help='Report CSV file')
    parser.add_argument('--key', help='Account key JSON file. Defaults to "{}"'.format(DEFAULTS["key"]), default=DEFAULTS["key"])
    parser.add_argument('-v','--verbose', help='Enable additional logging', action="store_true", dest="verbose")
    parser.add_argument('--no-heading',help='Disable the generation of a first heading row in the report', dest="heading", action="store_false")
    args = parser.parse_args()


    db = utils.make_connection(args.key)
    correct = read_correct_solutions(args.solutions)
    report = process_teams(db.collection("teams"), correct)
    write_report(report, args.report, args.heading)

if __name__=="__main__":
    main()
