class nodejs::config{

	package {
		["nodejs"]:
			ensure => "installed",
			require => Exec["install-epel"],
			allow_virtual => false,
	}

	package {
		["npm"]:
			ensure => "installed",
			require => Package["nodejs"],
			allow_virtual => false,
	}

}