import subprocess
import time
from timeloop import Timeloop
from datetime import timedelta

tl = Timeloop()
@tl.job(interval=timedelta(minutes=2))
def sample_job_every_2s():
	print("Git Pull at: ", time.ctime())
	subprocess.call(["git", "pull"])

if __name__ == "__main__":
    tl.start(block=True)

